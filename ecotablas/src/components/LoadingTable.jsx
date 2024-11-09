import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingTable = ({ loading }) => {
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner />
        </div>
      ) : null}
    </>
  );
};

export default LoadingTable;
