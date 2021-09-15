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

const PublishersEdit = () => {
  const [publisher, setPublisher] = useState([]);
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const { id } = useParams();

  console.log("Edit publisherId", id);

  const getAuthorById = async () => {
    setLoading(true);
    const response = await axios
      .get("/api/Publishers/" + id)
      .catch((err) => console.log("Error:", err));

    if (response && response.data) setPublisher(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getAuthorById();
  }, []);

  const handleSubmit = async (values) => {
    const headers = { "Access-Control-Allow-Origin": "https://localhost:5001" };
    console.log(values);
    await axios
      .put("/api/Publishers", values, { headers })
      .catch((err) => console.log("Error:", err));
  };

  if (loading) return <LoadingSpinner />;
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: publisher.name,
          road: publisher.road,
          publisherId: publisher.publisherId,
          adressId: publisher.adressId,
          zipCode: publisher.zipCode,
          city: publisher.city,
          country: publisher.country,
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

export default PublishersEdit;
