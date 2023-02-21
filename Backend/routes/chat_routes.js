import express from "express";
import ChatController from "../controller/chat_controller.js";

const ChatRouter = express.Router();

ChatRouter.get("/:id", ChatController.getChatById);
ChatRouter.post("/addRoom", ChatController.addRoom);

export default ChatRouter;