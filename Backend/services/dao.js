import userQueris from "./mysql_queris/user_queris.js";
import juegosQueris from "./mysql_queris/juegos_queris.js";
import imagenQueris from "./mysql_queris/imagen_queris.js";
import postQueris from "./mysql_queris/post_queris.js";
import chatQueris from "./mysql_queris/chat_queris.js";

const dao = {};
///Usuarios
dao.getUserByEmail = async (email) => await userQueris.getUserByEmail(email);

dao.addUser = async (userData) => await userQueris.addUser(userData);

dao.addUserJuegos = async (userData) =>
  await userQueris.addUserJuegos(userData);

dao.getUserById = async (id) => await userQueris.getUserById(id);

dao.deleteUser = async (id) => await userQueris.deleteUser(id);

dao.updateUser = async (id, userData) =>
  await userQueris.updateUser(id, userData);

dao.getJuegosByIdUsuario = async (idUsuario) =>
  await userQueris.getJuegosByIdUsuario(idUsuario);

// Añadir datos de la imagen subida al servidor
dao.updateImage = async (id, imageData) =>
  await userQueris.updateImage(id, imageData);

///Imagenes
dao.addImage = async (imageData) => await imagenQueris.addImage(imageData);

dao.getImageById = async (id) => await imagenQueris.getImageById(id);

dao.deleteImage = async (id) => await imagenQueris.deleteImage(id);

///Juegos
dao.addJuego = async (juegoData) => await juegosQueris.addJuego(juegoData);

dao.getJuegoById = async (id) => await juegosQueris.getJuegoById(id);

dao.getJuego = async () => await juegosQueris.getJuego();

dao.matchJuego = async (plataforma, juego) =>
  await juegosQueris.matchJuego(plataforma, juego);

dao.getJuegoByName = async (name) => await juegosQueris.getJuegoByName(name);

dao.deleteJuego = async (id) => await juegosQueris.deleteJuego(id);

///Posts
dao.addPost = async (id, postData) => await postQueris.addPost(id, postData);

dao.getPostById = async (id) => await postQueris.getPostById(id);

dao.getPostByPath = async (path) => await postQueris.getPostByPath(path);

dao.getPost = async () => await postQueris.getPost();

dao.getPostByName = async (comentario) =>
  await postQueris.getPostByName(comentario);

dao.deletePost = async (id) => await postQueris.deletePost(id);

dao.getPostByIdUsuario = async (idUsuario) =>
  await postQueris.getPostByIdUsuario(idUsuario);
//Chat
dao.getChatById = async (idUsuario) => await chatQueris.getChatById(idUsuario);

dao.addRoom = async (userData) => await chatQueris.addRoom(userData);
export default dao;
