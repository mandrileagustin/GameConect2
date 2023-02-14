import userQueris from "./mysql_queris/user_queris.js";
import juegosQueris from "./mysql_queris/juegos_queris.js";
import imagenQueris from "./mysql_queris/imagen_queris.js";
import postQueris from "./mysql_queris/post_queris.js";

const dao = {};
///Usuarios
dao.getUserByEmail = async (email) => await userQueris.getUserByEmail(email);

dao.addUser = async (userData) => await userQueris.addUser(userData);

dao.getUserById = async (id) => await userQueris.getUserById(id);

dao.deleteUser = async (id) => await userQueris.deleteUser(id);

dao.updateUser = async (id, userData) =>
  await userQueris.updateUser(id, userData);

///Imagenes
dao.addImage = async (imageData) => await imagenQueris.addImage(imageData);

dao.getImageById = async (id) => await imagenQueris.getImageById(id);

dao.deleteImage = async (id) => await imagenQueris.deleteImage(id);

///Juegos
dao.addJuego = async (juegoData) => await juegosQueris.addJuego(juegoData);

dao.getJuegoById = async (id) => await juegosQueris.getJuegoById(id);

dao.getJuego = async () => await juegosQueris.getJuego();

dao.getJuegoByName = async (name) => await juegosQueris.getJuegoByName(name);

dao.deleteJuego = async (id) => await juegosQueris.deleteJuego(id);

///Posts

dao.addPost = async (postData) => await postQueris.addPost(postData);

dao.getPostById = async (id) => await postQueris.getPostById(id);

dao.getPostByPath = async (path) => await postQueris.getPostByPath(path);

dao.getPost = async () => await postQueris.getPost();

dao.getPostByName = async (comentario) =>
  await postQueris.getPostByName(comentario);

dao.deletePost = async (id) => await postQueris.deletePost(id);
export default dao;
