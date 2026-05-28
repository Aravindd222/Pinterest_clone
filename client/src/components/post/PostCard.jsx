
import { motion } from "framer-motion";

const PostCard = ({
  post,
  onClick,
}) => {

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}

      transition={{
        duration: 0.2,
      }}

      onClick={() => onClick(post)}

      className="group relative mb-5 cursor-pointer break-inside-avoid"
    >

      <div className="overflow-hidden rounded-3xl bg-[#1a1a1a]">

        <img
          src={post.imageUrl}
          alt={post.title}
          loading="lazy"
          className="w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500" />

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300">

          <button className="bg-red-500 text-white px-5 py-3 rounded-full font-semibold shadow-lg">
            Save
          </button>

        </div>

      </div>

      <div className="pt-3 px-1">

        <h2 className="font-semibold text-[15px] line-clamp-2">
          {post.title}
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          @{post.user?.username}
        </p>

      </div>

    </motion.div>
  );
};

export default PostCard;
