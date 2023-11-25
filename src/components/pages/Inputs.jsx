import React from "react";

function Inputs({ id, title, type = "text", name, value, onChange, errors,onBlur,touched }) {
    

  return (
    <>
      <div className="input-group mb-3">
        <label htmlFor={id} className="me-2">{title}</label>
        <input
          type={type}
          name={name}
          className="form-control"
          id={id}
          value={value} 
          onChange={onChange}
          onBlur={onBlur}
        />
        
      </div>
    </>
  );
}

export default Inputs;
