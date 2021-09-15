import React from "react";
import Loader from "react-loader-spinner";

const LoadingSpinner = ({ loading }) => {
  {
    console.log("Spinner status", loading);
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
    </div>
  );
};

export default LoadingSpinner;
