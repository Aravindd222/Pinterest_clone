
import { motion } from "framer-motion";

const PostCard = ({
  post,
  onClick,
}) => {

  return (

    <motion.div

      whileHover={{
        y: -6,
      }}

      transition={{
        duration: 0.25,
      }}

      onClick={() => onClick(post)}

      className="group relative mb-6 break-inside-avoid cursor-pointer"
    >

      <div className="relative overflow-hidden rounded-[32px] bg-[#111111]">

        <img
          src={post.imageUrl}
          alt={post.title}
          loading="lazy"
          className="w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90" />

        {/* Category */}

        <div className="absolute top-5 left-5">

          <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">

            <p className="text-[10px] uppercase tracking-[0.25em] text-white/80">

              {post.category || "Editorial"}

            </p>

          </div>

        </div>

        {/* Save */}

        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition duration-300">

          <button className="bg-white text-black px-5 py-3 rounded-full font-semibold shadow-xl">

            Save

          </button>

        </div>

        {/* Content */}

        <div className="absolute bottom-0 left-0 w-full p-6">

          <h2 className="text-4xl font-serif leading-tight mb-3">

            {post.title}

          </h2>

          <div className="flex items-center justify-between">

            <p className="text-gray-300 text-sm">

              @{post.user?.username}

            </p>

            <p className="text-sm text-gray-400">

              ♥ 540

            </p>

          </div>

        </div>

      </div>

    </motion.div>

  );
};

export default PostCard;
