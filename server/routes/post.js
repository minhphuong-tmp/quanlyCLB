import express from "express";
import {
  commentPost,
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/post.controller.js";

import { searchUser } from "../controllers/searchUser.js";
import { getUserName } from "../controllers/getUserName.js";


const router = express.Router();

router.get("/post/:item", getPost);

router.post("/post/create", createPost);

router.patch("/post/update/:id", updatePost);

router.delete("/post/delete/:id", deletePost);

router.patch("/post/comment/:id", commentPost);

router.post("/search-user", searchUser)

router.get("/getUserName/:userId", getUserName)


export default router;
