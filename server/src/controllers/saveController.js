
import prisma from "../lib/prisma.js";

export const toggleSave = async (req, res) => {

  try {

    const { id } = req.params;

    const existingSave = await prisma.savedPost.findFirst({
      where: {
        postId: id,
        userId: req.user.id,
      },
    });

    if (existingSave) {

      await prisma.savedPost.delete({
        where: {
          id: existingSave.id,
        },
      });

      return res.json({
        saved: false,
      });
    }

    await prisma.savedPost.create({
      data: {
        postId: id,
        userId: req.user.id,
      },
    });

    res.json({
      saved: true,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
