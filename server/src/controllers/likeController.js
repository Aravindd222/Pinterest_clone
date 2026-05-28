
import prisma from "../lib/prisma.js";

export const toggleLike = async (req, res) => {

  try {

    const { id } = req.params;

    const existingLike = await prisma.like.findFirst({
      where: {
        postId: id,
        userId: req.user.id,
      },
    });

    if (existingLike) {

      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return res.json({
        liked: false,
      });
    }

    await prisma.like.create({
      data: {
        postId: id,
        userId: req.user.id,
      },
    });

    res.json({
      liked: true,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
