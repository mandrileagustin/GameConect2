import { currentDir } from "../index.js";
import dao from "../services/dao.js";
import { jwtVerify } from "jose";

const controller = {};
const __dirname = currentDir().__dirname;

controller.addPost = async (req, res) => {
  const { comentario } = req.body;
  // if (!comentario)
  //   return res.status(400).send("Error al recibir el comentario");

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
      let uploadPath = "app/public/images/products/" + image.name;
      // Usamos el método mv() para ubicar el archivo en nuestro servidor
      image.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
      await dao.addPost({
        comentario: comentario,
        path: uploadPath,
      });
    });
    return res.send("Imagen subida!");
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getPostById = async (req, res) => {
  try {
    // Buscamos si el id de la imagen existe en la base de datos
    const post = await dao.getPostById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    if (post.length <= 0) return res.status(404).send("el producto no existe");
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(post[0]);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getPostByPath = async (req, res) => {
  try {
    // Buscamos si el id de la imagen existe en la base de datos
    const post = await dao.getPostById(req.params.path);
    // Si no existe devolvemos un 404 (not found)
    if (post.length <= 0) return res.status(404).send("el producto no existe");
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(post[0]);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getPost = async (req, res) => {
  try {
    const post = await dao.getPost();
    // Si no existe devolvemos un 404 (not found)
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(post);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getPostByName = async (req, res) => {
  // Buscamos si el id de la imagen existe en la base de datos
  const name = req.params.name;
  if (!name) {
    return res.status(400).send("Error al recibir el body");
  }
  try {
    let post = await dao.getPostByName(name);

    // Si no existe devolvemos un 404 (not found)
    if (post.length <= 0) return res.status(404).send("el producto no existe");
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(post);
  } catch (e) {
    console.log(e.message);
  }
};

controller.deletePost = async (req, res) => {
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
    const post = await dao.getPostById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    if (post.length <= 0) return res.status(404).send("el post no existe");
    // Si existe, eliminamos el usuario por el id
    await dao.deletePost(req.params.id);
    // Devolvemos la respuesta
    return res.send(`Post con id ${req.params.id} eliminado`);
  } catch (e) {
    console.log(e.message);
  }
};
export default controller;
