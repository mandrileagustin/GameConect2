import db from "../mysql.js";
import md5 from "md5";
import utils from "../../cookies/utils.js";

const userQueris = {};

userQueris.getUserByEmail = async (email) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM usuario WHERE email = ?",
      email,
      "select",
      conn
    );
  } catch (error) {
    throw new Error(error);
  } finally {
    conn && (await conn.end);
  }
};

userQueris.addUser = async (userData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let userObj = {
      nombre: userData.nombre,
      apellido: userData.apellido,
      email: userData.email,
      password: md5(userData.password),
      plataforma: userData.plataforma,
      role: userData.role,
      genero: userData.genero,
      edad: userData.edad,
    };

    return await db.query("INSERT INTO usuario SET ?", userObj, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

userQueris.deleteUser = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "DELETE FROM usuario WHERE id =?",
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

userQueris.getUserById = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM usuario WHERE id = ?",
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

userQueris.updateUser = async (id, userData) => {
  let conn = null;

  try {
    conn = await db.createConnection();

    let userObj = {
      nombre: userData.nombre,
      apellido: userData.apellido,
      email: userData.email,
      password: userData.password ? md5(userData.password) : undefined,
      plataforma: userData.plataforma,
      juegos: userData.juegos,
      role: userData.role,
      genero: userData.genero,
      edad: userData.edad,
    };
    console.log(userObj);
    userObj = await utils.removeUndefinedKeys(userObj);
    console.log(userObj);
    return await db.query(
      "UPDATE usuario SET ? WHERE id = ?",
      [userObj, id],
      "update",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};
export default userQueris;
