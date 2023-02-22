import * as yup from "yup";

//5 caracteres,1 mayuscula,1 minuscula,1 numero
export const BasicFormSchema = yup.object().shape({
  nombre: yup.string().required("Requerido"),
});
