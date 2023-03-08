import { currentDir } from "../index.js";
import dao from "../services/dao.js";
import { jwtVerify } from "jose";

const controller = {};
const __dirname = currentDir().__dirname;

controller.addPost = async (req, res) => {
  const { id } = req.params;
  const { comentario } = req.body;

  try {
    if (req.files === null) return;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha cargado ningún archivo");
    }

    const images = !req.files.imagen.length
      ? [req.files.imagen]
      : req.files.imagen;

    images.forEach(async (image) => {
      let uploadPath = __dirname + "/public/images/products/" + image.name;
      let uploadRelPath = "/images/products/" + image.name;

      image.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });

      console.log("hola2");
      const addPost = await dao.addPost(id, {
        comentario: comentario,
        path: uploadRelPath,
      });
      if (addPost) {
        const posts = await dao.getPost();
        return res.send(posts);
      }
    });
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
    if (post.length <= 0) return res.status(404).send("No existe el Post");
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(post[0]);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getPostByIdUsuario = async (req, res) => {
  const idUsuario = req.params.idUsuario;
  try {
    // Buscamos si el id de la imagen existe en la base de datos
    const post = await dao.getPostByIdUsuario(idUsuario);
    // Si no existe devolvemos un 404 (not found)
    if (post.length <= 0) return res.status(404).send("el producto no existe");
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(post);
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
  try {
    const post = await dao.getPostById(req.params.id);

    if (post.length <= 0) return res.status(404).send("el post no existe");

    await dao.deletePost(req.params.id);

    const posts = await dao.getPostByIdUsuario(req.params.idUsuario);

    return res.send(posts);
  } catch (e) {
    console.log(e.message);
  }
};

export default controller;
