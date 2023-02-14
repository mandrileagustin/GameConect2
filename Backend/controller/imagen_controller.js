import { currentDir } from "../index.js";
import dao from "../services/dao.js";
import { jwtVerify } from "jose";

const controller = {};
const __dirname = currentDir().__dirname;
// controlador para subir una imagen a nuestro servidor y guardar el path en la base de datos.
controller.uploadImage = async (req, res) => {
  const { comentario } = req.body;
  if (!comentario) return res.status(400).send("Error al recibir el body");

  try {
    // Controlamos cuando el objeto files sea null
    if (req.files === null) return;
    // Controlamos si nos viene algún tipo de archivo en el objeto files
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha cargado ningún archivo");
    }
    if (!req.query) {
      return res.status(400).send("no hay id del producto");
    }
    // 1 archivo [{}] , >1 archivo [[{},{},...]]
    // Obtenemos un array de objetos con todas las imagenes
    const images = !req.files.imagen.length
      ? [req.files.imagen]
      : req.files.imagen;
    // Recorremos el array para procesar cada imagen
    images.forEach(async (image) => {
      // Ya podemos acceder a las propiedades del objeto image.
      // Obtenemos la ruta de la imagen.
      let uploadPath = __dirname + "public/images/products/" + image.name;
      let uploadRelPath = "images/products/" + image.name;

      // Usamos el método mv() para ubicar el archivo en nuestro servidor
      image.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
      await dao.addPost({
        comentario: comentario,
        path: uploadRelPath,
      });
    });
    return res.send("Imagen subida!");
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getImage = async (req, res) => {
  try {
    // Buscamos si el id de la imagen existe en la base de datos
    const image = await dao.getImageById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    if (image.length <= 0) return res.status(404).send("La imagen no existe");
    // Devolvemos la ruta donde se encuentra la imagen
    return res.sendFile(image[0].path, { root: __dirname });
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.deleteImage = async (req, res) => {
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
    const user = await dao.getImageById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    if (user.length <= 0) return res.status(404).send("el usuario no existe");
    // Si existe, eliminamos el usuario por el id
    await dao.deleteImage(req.params.id);
    // Devolvemos la respuesta
    return res.send(`Imagen con id ${req.params.id} eliminada`);
  } catch (e) {
    console.log(e.message);
  }
};
export default controller;
