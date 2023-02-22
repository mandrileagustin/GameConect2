import db from "../mysql.js";

const PostQueris = {};

///Post

PostQueris.getPost = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM post WHERE id  ORDER BY id DESC",
      [],
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

PostQueris.addPost = async (id, postData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let postObj = {
      path: postData.path,
      comentario: postData.comentario,
      idUsuario: id,
    };
    return await db.query(
      "INSERT INTO post SET ?",
      [postObj, id],
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

PostQueris.getPostById = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM post WHERE id = ?",
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

PostQueris.getPostByIdUsuario = async (idUsuario) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM post join usuario on post.idUsuario = usuario.id where idUsuario = ?",
      idUsuario,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end);
  }
};
PostQueris.getPostByPath = async (path) => {
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
    conn && (await conn.end);
  }
};

PostQueris.getPostByName = async (comentario) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      `SELECT * FROM post WHERE comentario LIKE '%${comentario}%'`,
      comentario,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end);
  }
};

PostQueris.deletePost = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("DELETE FROM post WHERE id =?", id, "delete", conn);
  } catch {
    throw new Error(e);
  } finally {
    conn && (await conn.end);
  }
};
export default PostQueris;
