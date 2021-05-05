import React from "react";

export const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} className="form-control" />
      <div className="aler alert-danger">{error}</div>
    </div>
  );
};

export const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} className="form-control">
        <option value=""></option>
        {options.map((o) => (
          <option key={o._id} value={o._id}>
            {o.name}
          </option>
        ))}
      </select>
      <div className="aler alert-danger">{error}</div>
    </div>
  );
};

export const SearchBox = ({ value, onChange, ...rest }) => {
  return (
    <div className="form-group">
      <input
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        {...rest}
      />
    </div>
  );
};
