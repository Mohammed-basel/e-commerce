import React from "react";
import Input from "../../pages/Inputs.jsx";
import { useFormik } from "formik";

function Register() {
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      let errors = {};
      if (!values.userName) {
        errors.userName = "User Name Is Required";
      }
      if (!values.email) {
        errors.email = "Email Is Required";
      }
      if (!values.password) {
        errors.password = "Password Is Required";
      }
      return errors;
    },
  });

  const Inputs = [
    {
      id: "username",
      type: "text",
      name: "userName",
      title: "user name",
      value: formik.values.userName,
    },
    {
      id: "email",
      type: "email",
      name: "email",
      title: "email",
      value: formik.values.email,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "password",
      value: formik.values.password,
    },
  ];

  const renderInputs = Inputs.map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      value={input.value}
      key={index}
      errors={formik.errors}
      onChange={formik.handleChange}
    />
  ));

  return (
    <>
      <div className="container">
        <h2>Create A New Account</h2>
        <form onSubmit={formik.handleSubmit}>{renderInputs}</form>
        <input type="submit" />
      </div>
    </>
  );
}

export default Register;
