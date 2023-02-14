import express from "express";
import imagenController from "../controller/imagen_controller.js";

const imagenRouter = express.Router();

imagenRouter.post("/upload", imagenController.uploadImage);

imagenRouter.get("/image/:id", imagenController.getImage);

imagenRouter.delete("/image/:id", imagenController.deleteImage);

export default imagenRouter;
