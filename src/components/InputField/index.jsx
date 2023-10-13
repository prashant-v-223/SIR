import { Input } from "antd";
import moment from "moment/moment";
import React from "react";
import "./InputField.scss";
const index = (props) => {
  const {
    value,
    label,
    placeholder,
    type,
    onChange,
    name,
    error,
    disabled,
    toltip,
    maxLength,
    icons,
    lblstyle,
    style,
  } = props;

  return type !== "date" ? (
    <div className="form-group my-2">
      {type === "textarea" && (
        <textarea
          {...props}
          type={type}
          value={value || ""}
          name={name}
          className={`form-control ${error && "was-validated"}`}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          autoComplete="off"
        />
      )}
      {type !== "textarea" && type !== "Password" ? (
        <>
          <Input
            {...props}
            type={type}
            value={value || ""}
            name={name}
            placeholder={placeholder}
            size="large"
            onChange={onChange}
            prefix={icons}
            disabled={disabled}
            maxLength={maxLength}
            style={style}
            autoComplete="new-state"
            autoSave="off"
          />
        </>
      ) : (
        <>
          <Input.Password
            {...props}
            type={type}
            value={value || ""}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            prefix={icons}
            autoComplete="off"
            size="large"
            maxLength={maxLength}
          />
        </>
      )}
      {error ? <span className="error">{error}</span> : null}
    </div>
  ) : (
    <div className="form-group w-100">
      <label
        htmlFor={label}
        style={lblstyle ? lblstyle : {}}
        className="lblInput"
      >
        {label}
      </label>
      <input
        type="date"
        className={`form-control w-100 ${error && "was-validated1"}`}
        id={label}
        placeholder="Date of Birth"
        name={name}
        onChange={onChange}
        format="dd/mm/yyyy"
        value={value}
        max={moment().format("YYYY-MM-DD")}
      />
      {error ? <span className="error">{error}</span> : null}
    </div>
  );
};

export default index;
