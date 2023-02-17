import express from "express";
import PostController from "../controller/post_controller.js";

const PostRouter = express.Router();

PostRouter.patch("/addPost/:id", PostController.addPost);

PostRouter.get("/post/:id", PostController.getPostById);

PostRouter.get("/postUsuario/:idUsuario", PostController.getPostByIdUsuario);

PostRouter.get("/post/:path", PostController.getPostByPath);

PostRouter.get("/", PostController.getPost);

PostRouter.get("/postName/:name", PostController.getPostByName);

PostRouter.delete("/:id", PostController.deletePost);

export default PostRouter;
