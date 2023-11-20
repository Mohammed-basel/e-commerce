import React from "react";

function Inputs({ id, title, type = "text", name, value, onChange, errors }) {
    console.log(errors)
  return (
    <>
      <div className="input-group mb-3">
        <label htmlFor={id}>{title}</label>
        <input
          type={type}
          name={name}
          className="form-control"
          id={id}
          value={value} 
          onChange={onChange}
        />
        {errors[name] &&<p className="text text-danger">{errors[name]}</p>}
      </div>
    </>
  );
}

export default Inputs;
