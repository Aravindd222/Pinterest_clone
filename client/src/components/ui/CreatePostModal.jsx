
import { useState } from "react";

import api from "../../api/axios";

const CreatePostModal = ({
  isOpen,
  onClose,
  onPostCreated,
}) => {

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);

      formData.append("description", description);

      formData.append("category", category);

      formData.append("image", image);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onPostCreated(response.data);

      onClose();

    } catch (error) {

      console.log(error);

      alert("Upload failed");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-2xl bg-[#181818] rounded-3xl p-8 border border-white/10">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold">
            Create Post
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 outline-none"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 outline-none h-32 resize-none"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-5 outline-none focus:border-orange-400
focus:bg-[#222]
transition-all"
          />

    
            <label
            className="
                    flex
                    h-64
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-3xl
                    border-2
                    border-dashed
                    border-white/10
                    bg-white/[0.03]
                    transition
                    hover:border-orange-400
                    hover:bg-white/[0.05]
  "
>
    {preview ? (
        <img
            src={preview}
            className="h-full w-full rounded-3xl object-cover"
        />
    ) : (
        <>
            <div className="text-6xl mb-4">+</div>

            <p className="text-lg font-semibold">
                Upload Image
            </p>

            <p className="text-gray-500 mt-2">
                JPG, PNG, WEBP
            </p>
        </>
    )}

    <input
        hidden
        type="file"
        accept="image/*"
        onChange={handleImageChange}
    />
</label>
            
          

          <button
            type="submit"
            disabled={loading}
            className="
w-full
rounded-2xl
bg-gradient-to-r
from-orange-500
to-red-500
py-5
font-bold
text-lg
hover:scale-[1.02]
transition
"
          >
            {loading ? "Uploading..." : "Create Post"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreatePostModal;
