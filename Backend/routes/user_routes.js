import express from "express";
import userController from "../controller/user_controller.js";
import validateLoginDto from "../cookies/validate_login_dto.js";
const userRouter = express.Router();
userRouter.post("/", userController.addUser);
userRouter.post("/login", validateLoginDto, userController.loginUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.patch("/:id", userController.updateUser);
userRouter.get("/:id", userController.getUserById);

export default userRouter;
