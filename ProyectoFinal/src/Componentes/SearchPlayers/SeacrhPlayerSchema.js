import * as yup from "yup";

//5 caracteres,1 mayuscula,1 minuscula,1 numero
export const BasicFormSchema = yup.object().shape({
  plataforma: yup
    .string()
    .oneOf(["PlayStation", "PC", "Xbox"])
    .required("Requerido"),
  juego: yup
    .string()
    .oneOf([
      "Call of Duty",
      "Elden ring",
      "Day z",
      "LoL",
      "Valorant",
      "Battlefield 1",
    ])
    .required("Requerido"),
});
