import express from "express";
import JuegosController from "../controller/juegos_controller.js";

const JuegosRouter = express.Router();

JuegosRouter.post("/addJuego", JuegosController.addJuego);

JuegosRouter.get("/juego/:id", JuegosController.getJuegoById);

JuegosRouter.get("/", JuegosController.getJuego);

JuegosRouter.get("/juegoName/:name", JuegosController.getJuegoByName);

JuegosRouter.delete("/:id", JuegosController.deleteJuego);

export default JuegosRouter;
