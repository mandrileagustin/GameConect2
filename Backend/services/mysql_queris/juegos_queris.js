import db from "../mysql.js";

const JuegosQueris = {};

///Juegos

JuegosQueris.getJuego = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("SELECT * FROM juegos", [], "select", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};
JuegosQueris.addJuego = async (juegoData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    let juegoObj = {
      nombre: juegoData.nombre,
      genero: juegoData.genero,
      plataforma: juegoData.plataforma,
    };
    return await db.query("INSERT INTO juegos SET ?", juegoObj, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

JuegosQueris.getJuegoById = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM juegos WHERE id = ?",
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

JuegosQueris.getJuegoByName = async (name) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      `SELECT * FROM juegos WHERE nombre LIKE '%${name}%'`,
      name,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end);
  }
};

JuegosQueris.deleteJuego = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("DELETE FROM juegos WHERE id =?", id, "delete", conn);
  } catch {
    throw new Error(e);
  } finally {
    conn && (await conn.end);
  }
};
export default JuegosQueris;
