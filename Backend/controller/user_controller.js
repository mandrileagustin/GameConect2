import dao from "../services/dao.js";
import md5 from "md5";
import { currentDir } from "../index.js";
import { SignJWT, jwtVerify } from "jose";

const controller = {};
const __dirname = currentDir().__dirname;

controller.addUser = async (req, res) => {
  const { nombre, email, password, apellido, plataforma, nickname, juegos } =
    req.body;

  if (!nombre || !email || !password || !apellido || !plataforma || !nickname)
    return res.status(400).send("Error al recibir el body");

  try {
    const user = await dao.getUserByEmail(email);
    if (user.length > 0)
      return res.status(409).send("El usuario ya esta registrado");

    const addUser = await dao.addUser(req.body);

    juegos.map(async function (id) {
      await dao.addUserJuegos({
        idUsuario: addUser,
        idJuego: Number(id.juego),
      });
    });

    return res.send(`Usuario ${nombre} con id: ${addUser}registrado`);
  } catch (e) {
    console.log(e.message);
  }
};

controller.getUserById = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).send("Error al recibir al body");
  try {
    // Buscamos si el id de la imagen existe en la base de datos
    const usuario = await dao.getUserById(id);
    // Si no existe devolvemos un 404 (not found)
    if (usuario.length <= 0)
      return res.status(404).send("el usuario no existe");
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(usuario[0]);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
  if (!email || !password)
    return res.status(400).send("Error al recibir el body");

  try {
    let user = await dao.getUserByEmail(email);
    // Si no existe el usuario respondemos con un 404 (not found)
    if (user.length <= 0) return res.status(404).send("usuario no registrado");
    // Pasamos md5 a la paswword recibida del cliente
    const clienPassword = md5(password);
    // Como la consulta a la base de datos nos devuelve un array con el objeto del usuario usamos la desestructuraci??n.
    [user] = user;
    // Si existe el usuario, comprobamos que la password es correcta. Si no lo es devolvemos un 401 (unathorized)
    if (user.password != clienPassword)
      return res.status(401).send("password incorrecta");
    // Si es correcta generamos el token y lo devolvemos al cliente
    // Construimos el JWT con el id, email y rol del usuario
    const jwtConstructor = new SignJWT({
      id: user.id,
      email,
      role: user.role,
      nickname: user.nickname,
    });

    // Codificamos el la clave secreta definida en la variable de entorno por requisito de la librer??a jose
    // y poder pasarla en el formato correcto (uint8Array) en el m??todo .sign
    const encoder = new TextEncoder();
    // Generamos el JWT. Lo hacemos as??ncrono, ya que nos devuelve una promesa.
    // Le indicamos la cabecera, la creaci??n, la expiraci??n y la firma (clave secreta).
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_SECRET));
    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send({ jwt });
  } catch (e) {
    console.log(e.message);
  }
};

// Controlador para eliminar un usuario por su id
controller.deleteUser = async (req, res) => {
  // OBTENER CABECERA Y COMPROBAR SU AUTENTICIDAD Y CADUCIDAD
  const { authorization } = req.headers;
  // Si no existe el token enviamos un 401 (unauthorized)
  if (!authorization) return res.sendStatus(401);
  const token = authorization.split(" ")[1];

  try {
    // codificamos la clave secreta
    const encoder = new TextEncoder();
    // verificamos el token con la funci??n jwtVerify. Le pasamos el token y la clave secreta codificada
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET)
    );
    // Verificamos que seamos usuario administrador
    if (!payload.role)
      return res.status(409).send("no tiene permiso de administrador");
    // Buscamos si el id del usuario existe en la base de datos
    const user = await dao.getUserById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    if (user.length <= 0) return res.status(404).send("el usuario no existe");
    // Si existe, eliminamos el usuario por el id
    await dao.deleteUser(req.params.id);
    // Devolvemos la respuesta
    return res.send(`Usuario con id ${req.params.id} eliminado`);
  } catch (e) {
    console.log(e.message);
  }
};

controller.updateUser = async (req, res) => {
  try {
    if (Object.entries(req.body).length === 0)
      return res.status(400).send("Error en el body");

    await dao.updateUser(req.params.id, req.body);
    await dao.getUserById(req.params.id);
    return res.send(`Usuario con id ${req.params.id} modificado`);
  } catch (e) {
    console.log(e.message);
  }
};

controller.updateImage = async (req, res) => {
  const { id } = req.params;
  try {
    // Controlamos cuando el objeto files sea null
    if (req.files === null) return;
    // Controlamos si nos viene alg??n tipo de archivo en el objeto files
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha cargado ning??n archivo");
    }
    // 1 archivo [{}] , >1 archivo [[{},{},...]]
    // Obtenemos un array de objetos con todas las imagenes
    const images = !req.files.imagen.length
      ? [req.files.imagen]
      : req.files.imagen;
    // Recorremos el array para procesar cada imagen
    images.forEach(async (image) => {
      // Ya podemos acceder a las propiedades del objeto image.
      // Obtenemos la ruta de la imagen.
      let uploadPath = __dirname + "/public/images/products/" + image.name;
      let uploadRelPath = "/images/products/" + image.name;
      // Usamos el m??todo mv() para ubicar el archivo en nuestro servidor
      image.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
      await dao.updateImage(id, {
        avatar: uploadRelPath,
        poducto: req.query.poducto,
      });
    });
    return res.send("Imagen subida!");
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getJuegosByIdUsuario = async (req, res) => {
  const idUsuario = req.params.idUsuario;
  try {
    // Buscamos si el id de la imagen existe en la base de datos
    const post = await dao.getJuegosByIdUsuario(idUsuario);
    // Si no existe devolvemos un 404 (not found)
    if (post.length <= 0) return res.status(404).send("el juego no existe");
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(post);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};
export default controller;
