import db from "../mysql.js";

const imagenQueris = {};
// Conectamos con la base de datos y buscamos si existe la imagen por su id.

imagenQueris.addImage = async (imageData) => {
  let conn = null;

  try {
    conn = await db.createConnection();

    let imageObj = {
      ruta: imageData.ruta,
      idUsuario: imageData.idUsuario,
      idJuego: imageData.idJuego,
    };
    return await db.query(
      "INSERT INTO imagenes SET?",
      imageObj,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

imagenQueris.getImageById = async (path) => {
  // Conectamos con la base de datos y buscamos si existe la imagen por el id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM post WHERE path = ?",
      path,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

imagenQueris.deleteImage = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "DELETE FROM imagene WHERE id =?",
      id,
      "delete",
      conn
    );
  } catch {
    throw new Error(e);
  } finally {
    conn && (await conn.end);
  }
};

export default imagenQueris;
