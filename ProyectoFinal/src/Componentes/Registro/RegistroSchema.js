import * as yup from "yup";

//5 caracteres,1 mayuscula,1 minuscula,1 numero
export const BasicFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Por favor inserta un email válido")
    .required("Requerido"),
  nombre: yup.string().required("Requerido"),
  password: yup.string().required("Requerido"),

  apellido: yup.string().required("Requerido"),
  edad: yup.number().required("Requerido"),
  genero: yup
    .string()
    .oneOf(["Masculino", "Femenino", "Prefiero no especificar"])
    .required("Requerido"),
  plataforma: yup
    .string()
    .oneOf(["PlayStation", "PC", "Xbox"])
    .required("Requerido"),

  nickname: yup.string().required("Requerido"),
});
