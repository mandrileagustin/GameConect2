import * as yup from "yup";

export const BasicFormSchema = yup.object().shape({
  comentario: yup.string(),
});
