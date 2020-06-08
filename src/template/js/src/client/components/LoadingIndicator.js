import * as React from "react";

const LoadingIndicator = ({ isLoading }) => {
  return (
    <>
      <div className={!isLoading ? "hidden" : "shade"} />
      <div className={!isLoading ? "hidden" : undefined} id="loading-indicator">
        <div className="orbit-spinner">
          <div className="orbit" />
          <div className="orbit" />
          <div className="orbit" />
        </div>
      </div>
    </>
  );
};

export default LoadingIndicator;
