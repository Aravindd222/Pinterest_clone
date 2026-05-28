
import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import { getPosts } from "../services/postService";

import PostCard from "../components/post/PostCard";

import CreatePostModal from "../components/ui/CreatePostModal";

import { useAuth } from "../context/AuthContext";
import PostModal from "../components/post/PostModal";

const HomePage = () => {
    const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const { user } = useAuth();

  useEffect(() => {

    const fetchPosts = async () => {
        setLoading(false);

      try {

        const data = await getPosts();

        setPosts(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchPosts();

  }, []);

  const handlePostCreated = (newPost) => {

    setPosts((prevPosts) => [
      newPost,
      ...prevPosts,
    ]);
  };
  const openPostModal = (post) => {

  setSelectedPost(post);

  setIsPostModalOpen(true);
};

  return (
    <MainLayout>

      <section className="max-w-[1600px] mx-auto">

        <div className="mb-12">

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-4">
            Discover
            <br />
            Visual Inspiration
          </h1>

          <p className="text-gray-400 text-lg max-w-xl">
            Explore premium creative content from creators around the world.
          </p>

        </div>

        {posts.length === 0 ? (

          <div className="text-center py-20 text-gray-500">
            No posts available
          </div>

        ) : (

          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-5">

  {loading ? (

    Array.from({ length: 10 }).map((_, index) => (
      <PostSkeleton key={index} />
    ))

  ) : (

    posts.map((post) => (
      <PostCard
        key={post.id}
        post={post}
        onClick={openPostModal}
      />
    ))

  )}

</div>

        )}

      </section>

      {user && (

        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-white text-black text-4xl font-light shadow-2xl hover:scale-110 transition duration-300 z-40"
        >
          +
        </button>

      )}

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    <PostModal
  post={selectedPost}
  isOpen={isPostModalOpen}
  onClose={() => setIsPostModalOpen(false)}
/>
    </MainLayout>
  );
};

export default HomePage;
