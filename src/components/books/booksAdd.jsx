import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { axios } from "./../../axios";
import CustomTextInput from "../common/customTextInput";
import ImageUploader from "../common/imageUploader";
import CustomMultiSelectInput from "./../common/customMultiSelectInput";
import CustomSelectInput from "./../common/CustomSelectInput";

const BooksAdd = () => {
  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [base64, setBase64] = useState([]);

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
  };
  useEffect(() => {
    getAuthors();
  }, []);
  const handleSubmit = async (values) => {
    console.log(values);
    const response = await axios
      .post("/api/Books", values)
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

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          description: "",
          pages: "",
          price: "",
          publisherId: "",
          authorIds: [],
          image: "",
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
          publisherId: Yup.string().required("Required"),
          authorIds: Yup.array()
            .min(1, "One author should be selected")
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
              label="Title"
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
            {/* <div className="mb-2 col-sm-5">
              <label>Publishers</label>
              <Select
                options={optionsPublishers}
                onChange={(value) => setFieldValue("publisherId", value.value)}
              />
            </div> */}

            <CustomSelectInput
              options={optionsPublishers}
              label="Publisher"
              name="publisherId"
              setTouched={setTouched}
              setFieldValue={setFieldValue}
            />

            <CustomMultiSelectInput
              options={authorsOptions}
              label="Authors"
              name="authorIds"
              setTouched={setTouched}
              setFieldValue={setFieldValue}
            />

            {/* <div className="mb-2 col-sm-5">
              <label>Authors</label>
              <Select
                options={authorsOptions}
                isMulti
                name="authorIds"
                onChange={(e) =>
                  setFieldValue(
                    "authorIds",
                    e.map((x) => x.value)
                  )
                }
              />
            </div> */}
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
        )}
      </Formik>
    </>
  );
};

export default BooksAdd;
