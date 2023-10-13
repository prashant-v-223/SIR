import { Checkbox } from "antd";
import React from "react";
import "./CheckBoxField.scss";
const index = ({ label, name, onChange, value, disabled }) => {
  return (
    <div className="form-check checkbox-lg">
      <Checkbox
        name={name}
        id={label}
        defaultChecked={value ? true : false}
        disabled={disabled}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={label}>
        {label}
      </label>
    </div>
  );
};

export default index;
