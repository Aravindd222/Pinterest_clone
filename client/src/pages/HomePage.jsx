
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
  try {
    const data = await getPosts();
    setPosts(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
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

      <section className="w-full">

        ```jsx id="i9ii9"
<div className="mb-16">

  {/* Label */}

  <div className="inline-flex items-center gap-3 border border-white/10 bg-white/[0.03] rounded-full px-5 py-2 mb-10">

    <div className="w-2 h-2 rounded-full bg-orange-400" />

    <p className="text-xs uppercase tracking-[0.25em] text-gray-400">



    </p>

  </div>

  {/* Hero */}

  <div className="grid grid-cols-1 xl:grid-cols-2 gap-24 items-end">

    <div>

      <h1 className="text-6xl
md:text-7xl
xl:text-8xl leading-[0.9] tracking-tight font-serif font-light mb-8">

        Discover
        <br />

        <span className="italic text-orange-400">
          visual
        </span>

        <br />

        inspiration

      </h1>

      <p className="text-gray-400 text-xl max-w-xl leading-relaxed mb-10">

        An editorial feed of premium creative work — handpicked from artists, designers, and creators shaping visual culture.

      </p>

      <div className="flex items-center gap-5">

        <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition duration-300">

          Explore Feed

        </button>

        <button className="border border-white/10 bg-white/[0.03] px-8 py-4 rounded-full hover:bg-white/[0.05] transition duration-300">

          Trending Boards

        </button>

      </div>

    </div>

<div className="flex gap-4 overflow-x-auto mt-14
mb-16 pb-2 no-scrollbar">

  {[
    "All",
    "Fashion",
    "Travel",
    "Architecture",
    "Editorial",
    "Craft",
    "Typography"
  ].map((category, index) => (

    <button
      key={category}
      className={`px-6 py-3 rounded-full whitespace-nowrap transition duration-300 border ${
        index === 0
          ? "bg-white text-black border-white"
          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
      }`}
    >

      {category}

    </button>

  ))}

</div>


    {/* Stats */}

    <div className="grid grid-cols-2 gap-6">

      {[
        ["12.4k", "Pins Curated"],
        ["2,180", "Creators"],
        ["640", "Boards Live"],
        ["+318", "This Week"],
      ].map(([value, label]) => (

        <div
          key={label}
          className="bg-white/[0.03] border border-white/5 rounded-[32px] p-10"
        >

          <h3 className="text-5xl font-serif mb-3">

            {value}

          </h3>

          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

            {label}

          </p>

        </div>

      ))}

    </div>

  </div>

</div>



        {posts.length === 0 ? (

          <div className="text-center py-20 text-gray-500">
            No posts available
          </div>

        ) : (

          <div
              className="
                columns-1
                sm:columns-2
                lg:columns-3
                xl:columns-4
                2xl:columns-5
                gap-6
                space-y-6"
>

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
          className="fixed bottom-10 right-10 lg:bottom-12 lg:right-12 w-16 h-16 rounded-full bg-white text-black text-4xl font-light shadow-2xl hover:scale-110 transition duration-300 z-40"
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
