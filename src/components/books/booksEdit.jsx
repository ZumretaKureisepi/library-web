import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { axios } from "./../../axios";
import CustomTextInput from "../common/customTextInput";
import ImageUploader from "../common/imageUploader";
import { useHistory } from "react-router-dom";
import CustomMultiSelectInput from "./../common/customMultiSelectInput";
import CustomSelectInput from "./../common/CustomSelectInput";
import LoadingSpinner from "./../common/loadingSpinner";

const BooksEdit = () => {
  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [book, setBook] = useState([]);
  const [base64, setBase64] = useState([]);
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const { id } = useParams();

  const getBookById = async () => {
    setLoading(true);
    const response = await axios
      .get("/api/Books/" + id)
      .catch((err) => console.log("Error:", err));

    if (response && response.data) setBook(response.data);
  };

  useEffect(() => {
    getBookById();
  }, []);

  console.log("Image", book.bookId);

  const getPublishers = async () => {
    const response = await axios
      .get("/api/Publishers")
      .catch((err) => console.log("Error:", err));

    if (response && response.data) setPublishers(response.data);
  };
  useEffect(() => {
    getPublishers();
  }, []);

  const getAuthors = async () => {
    const response = await axios
      .get("/api/Authors")
      .catch((err) => console.log("Error:", err));

    if (response && response.data) setAuthors(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getAuthors();
  }, []);

  const handleSubmit = async (values) => {
    const headers = { "Access-Control-Allow-Origin": "https://localhost:5001" };
    console.log(values);
    const response = await axios
      .put("/api/Books", values, { headers })
      .catch((err) => console.log("Error:", err));
  };

  const optionsPublishers = publishers.map((p) => ({
    value: p.publisherId,
    label: p.name,
  }));

  const authorsOptions = authors.map((a) => ({
    value: a.authorId,
    label: a.name,
  }));

  if (loading) return <LoadingSpinner />;
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: book.title,
          description: book.description,
          pages: book.pages,
          bookId: book.bookId,
          price: book.price,
          publisherId: book.publisherId,
          authorIds: book.authorIds,
          image: book.image,
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          description: Yup.string()
            .max(500, "Must be 500 characters or less")
            .required("Required"),
          pages: Yup.number().required("Required"),
          price: Yup.number().required("Required"),
          authorIds: Yup.array()
            .min(1, "One author should be selected")
            .required("Required"),
          publisherId: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
          setSubmitting(true);
          console.log("Values after submitting", values);
          handleSubmit(values);
          setSubmitting(false);
          history.push("/books");
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
              label="Title"
              value={values.title}
              name="title"
              type="text"
              placeholder="Book title"
            />
            <CustomTextInput
              label="Description"
              name="description"
              type="text"
              placeholder="Description"
            />
            <CustomTextInput
              label="Pages"
              name="pages"
              type="number"
              placeholder="Number of pages"
            />
            <CustomTextInput
              label="Price"
              name="price"
              type="number"
              placeholder="Book price"
            />

            <CustomSelectInput
              options={optionsPublishers}
              label="Publisher"
              name="publisherId"
              value={optionsPublishers.find((x) => {
                return x.value === values.publisherId;
              })}
              setTouched={setTouched}
              setFieldValue={setFieldValue}
            />

            <CustomMultiSelectInput
              options={authorsOptions}
              value={authorsOptions.filter(
                (option) => values.authorIds?.indexOf(option.value) != -1
              )}
              label="Authors"
              name="authorIds"
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
        )}
      </Formik>
    </>
  );
};

export default BooksEdit;
