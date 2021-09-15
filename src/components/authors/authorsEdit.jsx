import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { axios } from "./../../axios";
import CustomTextInput from "../common/customTextInput";
import ImageUploader from "../common/imageUploader";
import CustomMultiSelectInput from "../common/customMultiSelectInput";
import LoadingSpinner from "../common/loadingSpinner";

const AuthorsEdit = () => {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState([]);
  const [base64, setBase64] = useState([]);
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const { id } = useParams();

  const getBooks = async () => {
    const response = await axios
      .get("/api/Books")
      .catch((err) => console.log("Error:", err));

    if (response && response.data) setBooks(response.data);
  };
  useEffect(() => {
    getBooks();
  }, []);

  const getAuthorById = async () => {
    setLoading(true);
    const response = await axios
      .get("/api/Authors/" + id)
      .catch((err) => console.log("Error:", err));

    const birthday = response.data.dateOfBirth.split("T")[0];
    const author = {
      ...response.data,
      dateOfBirth: birthday,
    };

    if (response && response.data) setAuthor(author);
    setLoading(false);
  };

  useEffect(() => {
    getAuthorById();
  }, []);

  const booksOptions = books.map((b) => ({
    value: b.bookId,
    label: b.title,
  }));

  const handleSubmit = async (values) => {
    const response = await axios
      .put("/api/Authors", values)
      .catch((err) => console.log("Error:", err));
  };
  if (loading) return <LoadingSpinner />;
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: author.name,
          biography: author.biography,
          authorId: author.authorId,
          dateOfBirth: author.dateOfBirth,
          email: author.email,
          bookIds: author.bookIds,
          image: author.image,
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
          handleSubmit(values);
          resetForm();
          setSubmitting(false);
          history.push("/authors");
        }}
      >
        {({
          values,
          setFieldValue,
          defaultOptions,
          selectedOptions,
          setTouched,
        }) => {
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
                value={values.dateOfBirth}
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
                value={booksOptions.filter(
                  (option) => values.bookIds?.indexOf(option.value) != -1
                )}
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
                  src={values.image}
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

export default AuthorsEdit;
