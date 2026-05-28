
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

import {
  toggleLike,
  toggleSave,
  createComment,
  getComments,
} from "../../services/interactionService";

import { useAuth } from "../../context/AuthContext";

const PostModal = ({
  post,
  isOpen,
  onClose,
}) => {

  const { user } = useAuth();

  const [liked, setLiked] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const [likeCount, setLikeCount] =
    useState(0);

  const [comments, setComments] =
    useState([]);

  const [commentText, setCommentText] =
    useState("");

  useEffect(() => {

    if (!post) return;

    setLikeCount(
      post.likes?.length || 0
    );

  }, [post]);

  useEffect(() => {

    const fetchComments = async () => {

      if (!post) return;

      try {

        const data =
          await getComments(post.id);

        setComments(data);

      } catch (error) {

        console.log(error);
      }
    };

    if (isOpen && post) {
      fetchComments();
    }

  }, [isOpen, post]);

  const handleLike = async () => {

    if (!user || !post) return;

    const previousLiked = liked;

    setLiked(!liked);

    setLikeCount((prev) =>
      previousLiked
        ? prev - 1
        : prev + 1
    );

    try {

      await toggleLike(post.id);

    } catch (error) {

      console.log(error);

      setLiked(previousLiked);

      setLikeCount((prev) =>
        previousLiked
          ? prev + 1
          : prev - 1
      );
    }
  };

  const handleSave = async () => {

    if (!user || !post) return;

    const previousSaved = saved;

    setSaved(!saved);

    try {

      await toggleSave(post.id);

    } catch (error) {

      console.log(error);

      setSaved(previousSaved);
    }
  };

  const handleComment = async () => {

    if (
      !commentText.trim() ||
      !post
    ) return;

    try {

      const newComment =
        await createComment(
          post.id,
          commentText
        );

      setComments((prev) => [
        newComment,
        ...prev,
      ]);

      setCommentText("");

    } catch (error) {

      console.log(error);
    }
  };

  if (!post) return null;

  return (
    <AnimatePresence>

      {isOpen && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >

          <motion.div
            initial={{
              scale: 0.95,
              opacity: 0,
            }}

            animate={{
              scale: 1,
              opacity: 1,
            }}

            exit={{
              scale: 0.95,
              opacity: 0,
            }}

            transition={{
              duration: 0.25,
            }}

            className="w-full max-w-7xl h-[90vh] bg-[#181818] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-white/10"
          >

            <div className="bg-black flex items-center justify-center overflow-hidden">

              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />

            </div>

            <div className="flex flex-col h-full">

              <div className="p-8 border-b border-white/10">

                <div className="flex items-center justify-between mb-6">

                  <div>

                    <h2 className="text-4xl font-black mb-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-400">
                      @{post.user?.username}
                    </p>

                  </div>

                  <button
                    onClick={onClose}
                    className="text-2xl text-gray-400 hover:text-white transition"
                  >
                    ✕
                  </button>

                </div>

                <p className="text-gray-300 leading-relaxed">
                  {post.description}
                </p>

              </div>

              <div className="flex items-center gap-4 p-6 border-b border-white/10">

                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-5 py-3 rounded-full"
                >

                  <motion.div
                    whileTap={{
                      scale: 1.4,
                    }}
                  >

                    {liked ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}

                  </motion.div>

                  <span>
                    {likeCount}
                  </span>

                </button>

                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-5 py-3 rounded-full"
                >

                  {saved ? (
                    <FaBookmark />
                  ) : (
                    <FaRegBookmark />
                  )}

                </button>

              </div>

              <div className="flex-1 overflow-y-auto p-6">

                <h3 className="text-xl font-bold mb-4">
                  Comments
                </h3>

                <div className="space-y-4">

                  {comments.map(
                    (comment) => (

                      <motion.div
                        key={comment.id}

                        initial={{
                          opacity: 0,
                          y: 10,
                        }}

                        animate={{
                          opacity: 1,
                          y: 0,
                        }}

                        className="bg-black/30 rounded-2xl p-4"
                      >

                        <p className="text-sm text-gray-400 mb-1">
                          @{comment.user.username}
                        </p>

                        <p>
                          {comment.text}
                        </p>

                      </motion.div>

                    )
                  )}

                </div>

              </div>

              <div className="p-6 border-t border-white/10 flex gap-3">

                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) =>
                    setCommentText(
                      e.target.value
                    )
                  }
                  className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                />

                <button
                  onClick={handleComment}
                  className="bg-white text-black px-6 rounded-2xl font-semibold"
                >
                  Send
                </button>

              </div>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
};

export default PostModal;
