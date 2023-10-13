import { Button } from "antd";
import React from "react";
function index({ className, onClick, disabled, label, style, type, Stake }) {
  return (
    <div
      className={`${
        !Stake ? "w-100 pt-15 pb-2" : ""
      } h-100  d-flex  justify-content-center align-items-center`}
    >
      <Button
        className={className}
        disabled={disabled}
        size="large"
        onClick={onClick}
        type={type}
        style={style}
      >
        {!Stake ? (
          <>
            <img
              src={require("../../assets/img/Vector (27).png")}
              alt=""
              className="img-fluid mx-2 mb-1"
            />
            {label}
          </>
        ) : (
          label
        )}
      </Button>
    </div>
  );
}

export default index;
