import prisma from "../lib/prisma.js";
import cloudinary from "../config/cloudinary.js";

export const createPost = async (req, res) => {
  try {

    const { title, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const uploadedResponse = await cloudinary.uploader.upload(
      base64Image,
      {
        folder: "zuntra_posts",
      }
    );

    const post = await prisma.post.create({
      data: {
        title,
        description,
        category,
        imageUrl: uploadedResponse.secure_url,
        userId: req.user.id,
      },
    });

    res.status(201).json(post);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getPosts = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;

    const limit = 10;

    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: limit,

      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        likes: true,
        saves: true,
        comments: true,
      },
    });

    res.status(200).json(posts);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};