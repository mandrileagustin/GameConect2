import dao from "../services/dao.js";

const controller = {};

controller.getChat = async (req, res) => {
  try {
    const chat = await dao.getChat(req.params.id);

    if (chat.length <= 0) return res.status(404).send("el chat no existe");

    return res.send(chat);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};
controller.getChatById = async (req, res) => {
  try {
    const chat = await dao.getChatById(req.params.id);

    if (chat.length <= 0) return res.status(404).send("el chat no existe");

    return res.send(chat);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.addRoom = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre) return res.status(400).send("Error al recibir el body");
  let chatObj = {
    nombre: nombre,
    idUsuario: id,
  };

  const addRoom = await dao.addRoom(chatObj);
  if (addRoom) {
    return res.sendStatus(200);
  } else {
    return Error;
  }
};

export default controller;
