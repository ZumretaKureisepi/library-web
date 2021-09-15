import React from "react";
import { ErrorMessage, useField } from "formik";
import Select from "react-select";

const CustomMultiSelectInput = ({
  options,
  setTouched,
  onBlur,
  value,
  setFieldValue,
  label,
  ...props
}) => {
  const [field, meta, helper] = useField(props);
  // console.log("Meta info zzz:", meta);
  // console.log("Field info zzz:", field);
  return (
    <div className="mb-2 col-sm-5">
      <label>{label}</label>
      <Select
        options={options}
        isMulti
        value={value}
        name={props.name}
        onBlur={() => helper.setTouched(true)}
        onChange={(e) => {
          setFieldValue(
            props.name,
            e.map((x) => x.value)
          );
          // setTouched(props.name, true);
        }}
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

export default CustomMultiSelectInput;
