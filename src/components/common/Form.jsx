import Joi from "joi-browser";
import React, { Component, setState } from "react";
import { Input, Select } from "./FormFeilds";
import _ from "lodash";

class Form extends Component {
  //Validating etire form
  validate = () => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    error.details.forEach((d) => (errors[d.path[0]] = d.message));
    return Object.keys(errors) === 0 ? null : errors;
  };

  //validating the field
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const _schema = { [name]: _.get(this.schema, name) };
    const { error } = Joi.validate(obj, _schema);
    return !error ? null : error.details[0].message;
  };

  //handle change of a field
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  //Handle the submit
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState(errors || {});
    if (errors) {
      return;
    }
    this.doSubmit();
  };

  //Render input fields
  renderInputFiels(name, label, autoFocus = false, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        onChange={this.handleChange}
        label={label}
        value={_.get(data, name)}
        autoFocus={autoFocus}
        error={errors[name]}
      />
    );
  }

  //Render input fields
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        onChange={this.handleChange}
        label={label}
        value={data[name]}
        error={errors[name]}
        options={options}
      />
    );
  }

  //Rnder Submit button
  renderSubmitButton(label) {
    return (
      <button
        disabled={this.validate(this.state.data)}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }
}

export default Form;
