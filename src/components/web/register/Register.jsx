import React from "react";
import Input from "../../pages/Inputs.jsx";
import { useFormik } from "formik";
import { registerSchema } from "../validation/validate.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    image: "",
  };

  const handelFieldChange = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
  };

  const onSubmit = async (users) => {
    const formData = new FormData();
    formData.append("userName", users.userName);
    formData.append("email", users.email);
    formData.append("password", users.password);
    formData.append("image", users.image);

    const { data } = await axios.post(
      `https://ecommerce-node4.vercel.app/auth/signup `,
      formData
    );
    console.log(data);
    if (data.message === "success") {
      formik.resetForm();
      toast("Account Created Successfully, make sure to verify your email", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: registerSchema,
  });

  const Inputs = [
    {
      id: "username",
      type: "text",
      name: "userName",
      title: "Username",
      value: formik.values.userName,
    },
    {
      id: "email",
      type: "email",
      name: "email",
      title: "Email",
      value: formik.values.email,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "Password",
      value: formik.values.password,
    },
    {
      id: "image",
      type: "file",
      name: "image",
      title: "User Image",
      onChange: handelFieldChange,
    },
  ];

  const renderInputs = Inputs.map((input, index) => (
    <div key={index} className="mb-4">
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        title={input.title}
        value={input.value}
        onChange={input.onChange || formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched}
      />
      {formik.touched[input.name] && formik.errors[input.name] && (
        <div className="text-danger mt-1">{formik.errors[input.name]}</div>
      )}
    </div>
  ));

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5  bg-light" style={{ width: "500px" }}>
        <h2 className="mb-4 text-center">Create A New Account</h2>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          {renderInputs}

          <button
            type="submit"
            className={`btn ${formik.isValid ? "btn-primary" : "btn-secondary"} w-100`}
            disabled={!formik.isValid}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
