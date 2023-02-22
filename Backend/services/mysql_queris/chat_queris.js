import db from "../mysql.js";

const ChatQueris = {};

ChatQueris.getChatById = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT chat.id as idSala, usuario.nickname, usuario.id as idUsuario FROM chat join usuario on chat.idUsuario = usuario.id where usuario.id = ?",
      id,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end);
  }
};

ChatQueris.addRoom = async (userData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    return await db.query("INSERT INTO chat SET ?", [userData], "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};
export default ChatQueris;
