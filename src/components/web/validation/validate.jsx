import * as yup from 'yup';

export const registerSchema = yup.object({
  userName:yup.string().required("user name is required").min(3,"must be more than 3 char").max(20,"must be less than 20 char"),
  email:yup.string().required("email is required").email(),
  password:yup.string().required("password is required").min(3,"must be more than 3 char").max(20,"must be less than 20 char")
})

export const SignInSchema = yup.object({
  email:yup.string().required("email is required").email(),
  password:yup.string().required("password is required").min(3,"must be more than 3 char").max(20,"must be less than 20 char")
})

