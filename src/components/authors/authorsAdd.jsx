import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { axios } from "./../../axios";
import CustomTextInput from "../common/customTextInput";
import ImageUploader from "../common/imageUploader";
import CustomMultiSelectInput from "../common/customMultiSelectInput";

const AuthorsAdd = () => {
  const [books, setBooks] = useState([]);
  const [base64, setBase64] = useState([]);

  const getBooks = async () => {
    const response = await axios
      .get("/api/Books")
      .catch((err) => console.log("Error:", err));

    if (response && response.data) setBooks(response.data);
  };
  useEffect(() => {
    getBooks();
  }, []);

  const booksOptions = books.map((b) => ({
    value: b.bookId,
    label: b.title,
  }));

  const handleBlur = (e) => {
    console.log("Handle blur", e);
  };

  const handleSubmit = async (values) => {
    console.log("handle submit");
    const response = await axios
      .post("/api/Authors", values)
      .catch((err) => console.log("Error:", err));
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          biography: "",
          dateOfBirth: "",
          email: "",
          bookIds: [],
          image: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          biography: Yup.string()
            .max(500, "Must be 500 characters or less")
            .required("Required"),
          dateOfBirth: Yup.date().required("Required"),
          email: Yup.string()
            .email("Invalid email format")
            .required("Required"),
          bookIds: Yup.array()
            .min(1, "One book should be selected")
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
        }) => {
          console.log(values);
          return (
            <Form>
              <CustomTextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Name"
              />
              <CustomTextInput
                label="Biography"
                name="biography"
                type="text"
                placeholder="Biography"
              />
              <CustomTextInput
                label="Date of birth"
                name="dateOfBirth"
                type="date"
              />
              <CustomTextInput
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
              />

              <CustomMultiSelectInput
                options={booksOptions}
                label="Books"
                name="bookIds"
                setTouched={setTouched}
                setFieldValue={setFieldValue}
              />
              <div
                style={{
                  float: "right",
                  display: "inline-block",
                }}
              >
                <ImageUploader
                  onFileUploaded={(base64) => {
                    setFieldValue("image", base64);
                    setBase64(base64);
                  }}
                />
                <img
                  src={base64}
                  style={{
                    width: "200px",
                    height: "300px",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{ marginLeft: "1rem" }}
                className="btn btn-primary"
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AuthorsAdd;
