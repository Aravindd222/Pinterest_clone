
import prisma from "../lib/prisma.js";

export const createComment = async (req, res) => {

  try {

    const { text } = req.body;

    const { id } = req.params;

    const comment = await prisma.comment.create({
      data: {
        text,
        userId: req.user.id,
        postId: id,
      },

      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    res.status(201).json(comment);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getComments = async (req, res) => {

  try {

    const { id } = req.params;

    const comments = await prisma.comment.findMany({
      where: {
        postId: id,
      },

      include: {
        user: {
          select: {
            username: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(comments);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
