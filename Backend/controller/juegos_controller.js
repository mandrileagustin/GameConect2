import { currentDir } from "../index.js";
import dao from "../services/dao.js";
import { jwtVerify } from "jose";

const controller = {};
const __dirname = currentDir().__dirname;

controller.addJuego = async (req, res) => {
  const { nombre, genero, plataforma } = req.body;

  if (!nombre || !genero || !plataforma)
    return res.status(400).send("Error al recibir el body");

  const addJuego = await dao.addJuego(req.body);
  if (addJuego) {
    return res.sendStatus(200);
  } else {
    return Error;
  }
};

controller.getJuegoById = async (req, res) => {
  try {
    // Buscamos si el id de la imagen existe en la base de datos
    const juego = await dao.getJuegoById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    if (juego.length <= 0) return res.status(404).send("el producto no existe");
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(juego[0]);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getJuego = async (req, res) => {
  try {
    const product = await dao.getJuego();
    // Si no existe devolvemos un 404 (not found)
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(product);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getJuegoByName = async (req, res) => {
  // Buscamos si el id de la imagen existe en la base de datos
  const name = req.params.name;
  if (!name) {
    return res.status(400).send("Error al recibir el body");
  }
  try {
    let product = await dao.getJuegoByName(name);

    // Si no existe devolvemos un 404 (not found)
    if (product.length <= 0)
      return res.status(404).send("el producto no existe");
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(product);
  } catch (e) {
    console.log(e.message);
  }
};

// Controlador para eliminar un usuario por su id
controller.deleteJuego = async (req, res) => {
  // OBTENER CABECERA Y COMPROBAR SU AUTENTICIDAD Y CADUCIDAD
  const { authorization } = req.headers;
  // Si no existe el token enviamos un 401 (unauthorized)
  if (!authorization) return res.sendStatus(401);
  const token = authorization.split(" ")[1];

  try {
    // codificamos la clave secreta
    const encoder = new TextEncoder();
    // verificamos el token con la función jwtVerify. Le pasamos el token y la clave secreta codificada
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET)
    );
    // Verificamos que seamos usuario administrador
    if (!payload.role)
      return res.status(409).send("no tiene permiso de administrador");
    // Buscamos si el id del usuario existe en la base de datos
    const juego = await dao.getJuegoById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    if (juego.length <= 0) return res.status(404).send("el juego no existe");
    // Si existe, eliminamos el usuario por el id
    await dao.deleteJuego(req.params.id);
    // Devolvemos la respuesta
    return res.send(`Juego con id ${req.params.id} eliminado`);
  } catch (e) {
    console.log(e.message);
  }
};
export default controller;
