import * as yup from "yup";

export const UsuarioSchema = yup.object().shape({
  nickname: yup.string(),
  avatar: yup.string(),
});
