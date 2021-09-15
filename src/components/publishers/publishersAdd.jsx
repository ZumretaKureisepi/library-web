import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { axios } from "./../../axios";
import CustomTextInput from "../common/customTextInput";

const PublishersAdd = () => {
  const handleSubmit = async (values) => {
    console.log(values);
    await axios
      .post("/api/Publishers", values)
      .catch((err) => console.log("Error:", err));
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          road: "",
          zipCode: "",
          city: "",
          country: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          road: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          zipCode: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          city: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          country: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
          setSubmitting(true);
          console.log(values);
          handleSubmit(values);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          setFieldValue,
          defaultOptions,
          selectedOptions,
          setTouched,
        }) => (
          <Form>
            <CustomTextInput
              label="Name"
              name="name"
              type="text"
              placeholder="Name"
            />
            <CustomTextInput
              label="Road"
              name="road"
              type="text"
              placeholder="Road"
            />
            <CustomTextInput
              label="ZIP Code"
              name="zipCode"
              type="text"
              placeholder="ZIP Code"
            />
            <CustomTextInput
              label="City"
              name="city"
              type="text"
              placeholder="City"
            />
            <CustomTextInput
              label="Country"
              name="country"
              type="text"
              placeholder="Country"
            />

            <button
              type="submit"
              style={{ marginLeft: "1rem" }}
              className="btn btn-primary"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PublishersAdd;
