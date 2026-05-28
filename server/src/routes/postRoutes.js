import express from "express";

import protect from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";
import { toggleLike } from "../controllers/likeController.js";

import { toggleSave } from "../controllers/saveController.js";
import {
  createComment,
  getComments,
} from "../controllers/commentController.js";

import {
  createPost,getPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.post(
  "/",
  protect,
  upload.single("image"),
  createPost
);
router.post("/:id/like", protect, toggleLike);

router.post("/:id/save", protect, toggleSave);

router.post("/:id/comment", protect, createComment);

router.get("/:id/comments", getComments);

export default router;