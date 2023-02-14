import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required("Please enter a valid email"),
  password: yup.string().required("Required"),
});
