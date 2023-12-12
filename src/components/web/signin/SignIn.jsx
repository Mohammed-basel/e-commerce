import React, { useContext } from "react";
import Input from "../../pages/Inputs.jsx";
import { useFormik } from "formik";
import { SignInSchema } from "../validation/validate.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User.jsx";

function SignIn() {
  const navigate = useNavigate();

  
  let {userToken,setUserToken} =useContext(UserContext);
  if(userToken){
    navigate(-1)
  }
  
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (users) => {
    const { data } = await axios.post(
      `https://ecommerce-node4.vercel.app/auth/signin`,
      users
    );
    if (data.message == "success") {
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);

      toast("Welcome", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "dark",
      });
    }
    navigate("/");
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: SignInSchema,
  });

  const Inputs = [
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
  ];

  const renderInputs = Inputs.map((input, index) => (
    <div key={index} className="mb-4">
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        title={input.title}
        value={input.value}
        onChange={formik.handleChange}
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
        <h2 className="mb-4 text-center">Sign In</h2>
        <form onSubmit={formik.handleSubmit}>
          {renderInputs}

          <button
            type="submit"
            className={`btn ${
              formik.isValid ? "btn-primary" : "btn-secondary"
            } w-100`}
            disabled={!formik.isValid}
          >
            Sign In
          </button>
          <div className="mt-3 text-center">
            <Link to="/sendcode" className="text-muted">
              Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
