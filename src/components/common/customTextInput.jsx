import React from "react";
import { ErrorMessage, useField } from "formik";

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-2 col-sm-5">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className="form-control shadow-none"
        autoComplete="off"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div
          className="alert alert-danger"
          style={{ padding: "0.2rem 0.2rem", marginBottom: "0.3rem" }}
        >
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default CustomTextInput;
