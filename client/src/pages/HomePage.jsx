
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
<div className="mb-24">

  {/* Editorial Label */}

  <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 mb-12">

    <div className="h-2 w-2 rounded-full bg-orange-500" />

    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
      
    </p>

  </div>

  {/* Hero */}

  <div className="
grid
grid-cols-1
xl:grid-cols-[1.1fr_0.9fr]
items-center
gap-16
xl:gap-24
">

    {/* Left */}

    <div>

      <h1 className="
font-serif
text-5xl
sm:text-6xl
lg:text-7xl
xl:text-[92px]
leading-[0.92]
tracking-tight
">

        Discover

        <br />

        <span className="italic text-orange-500">

          visual

        </span>

        <br />

        inspiration

      </h1>

      <p className="mt-8 max-w-xl text-xl leading-relaxed text-gray-400">

        Explore premium editorial photography, architecture,
        interiors, fashion and creative inspiration curated
        from creators around the world.

      </p>

      <div className="mt-10 flex flex-wrap gap-5">

        <button
          className="
          rounded-full
          bg-gradient-to-r
          from-orange-500
          to-red-500
          px-8
          py-4
          font-semibold
          shadow-lg
          hover:scale-105
          transition-all
        "
        >

          Explore Feed

        </button>

        <button
          className="
          rounded-full
          border
          border-white/10
          bg-white/[0.03]
          px-8
          py-4
          hover:bg-white/5
          transition-all
        "
        >

          Trending Boards

        </button>

      </div>

    </div>

    {/* Featured Card */}

    <div>

      <div className="
relative
overflow-hidden
rounded-[36px]
border
border-white/10
aspect-[4/5]
max-h-[640px]
">

        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
          alt=""
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10" />

        <div className="bottom-10
left-10
right-10">

          <span className="rounded-full bg-white/10 backdrop-blur px-4 py-2 text-sm">

            Featured Collection

          </span>

          <h2 className="mt-5 font-serif text-4xl">

            Scandinavian Interiors

          </h2>

          <p className="mt-3 text-gray-300">

            Modern architecture · Minimal living

          </p>

        </div>

      </div>

    </div>

  </div>

  {/* Categories */}

  <div className="mt-28">

    <h2 className="mb-8 font-serif text-3xl">

      Popular Categories

    </h2>

    <div className="flex flex-wrap gap-4 max-w-6xl">

      {[
        "Fashion",
        "Travel",
        "Architecture",
        "Interior",
        "Editorial",
        "Photography",
        "Nature",
        "Typography",
        "Art",
      ].map((category) => (

        <button
          key={category}
          className="
            group
            rounded-full
            border
            border-white/10
            bg-white/[0.03]
            px-6
            py-3
            text-sm
            font-medium
            transition-all
            duration-300
            hover:bg-white
            hover:text-black
            hover:border-white
            hover:-translate-y-1
          "
        >

          {category}

        </button>

      ))}

    </div>

  </div>

  {/* Stats */}

  <div className="mt-20">

    <h2 className="mb-8 font-serif text-3xl">

      Today's Highlights

    </h2>

    <div className="
grid
grid-cols-2
xl:grid-cols-4
gap-6
mt-12
">

      {[
        ["12.4K", "Pins Curated"],
        ["2,180", "Creators"],
        ["640", "Boards Live"],
        ["+318", "This Week"],
      ].map(([value, label]) => (

        <div
          key={label}
          className="
group
rounded-[30px]
border
border-white/10
bg-gradient-to-b
from-white/[0.04]
to-white/[0.02]
p-8
transition-all
duration-500
hover:-translate-y-1
hover:border-orange-500/30
hover:bg-white/[0.05]
"
        >

          <h3 className="font-serif text-4xl
xl:text-5xl">

            {value}

          </h3>

          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gray-500">

            {label}

          </p>

        </div>

      ))}

    </div>

  </div>

</div>

{/* Latest Feed */}

<div className="mt-24 mb-10 flex items-center justify-between">

  <div>

    <h2 className="font-serif text-4xl">

      Latest Inspiration

    </h2>

    <p className="mt-2 text-gray-500">

      Fresh visual discoveries from the community.

    </p>

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
          className="
fixed
bottom-10
right-10
z-40
flex
h-16
w-16
items-center
justify-center
rounded-full
bg-gradient-to-br
from-orange-500
to-red-500
text-4xl
text-white
shadow-[0_20px_50px_rgba(255,85,0,0.45)]
transition-all
duration-300
hover:scale-110
hover:rotate-90
"
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
