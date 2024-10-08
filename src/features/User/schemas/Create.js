import * as yup from "yup";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("The name is required")
    .max(50, "The name must be at most 50 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("The email is required"),
  password: yup
    .string()
    .required("The password is required")
    .min(3, "The password must be at least 3 characters"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required")
    .min(3, "Password confirmation must be at least 3 characters"),
  roles: yup
    .array()
    .of(yup.string().required("Each role must be a string"))
    .min(1, "You must select at least one role")
    .required("The role is required"),
});

export default schema;
