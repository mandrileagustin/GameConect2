import db from "../mysql.js";

const ChatQueris = {};

ChatQueris.getChatById = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM chat WHERE id = ?",
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

    let userObj = {
      nombre: userData.nombre,
    };

    return await db.query("INSERT INTO chat SET ?", userObj, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};
export default ChatQueris;
