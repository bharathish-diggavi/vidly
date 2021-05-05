import React from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import Form from "./common/Form";
import { toast } from "react-toastify";
import { Redirect } from "react-router";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  async doSubmit() {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from : "/";
    } catch (ex) {
      console.log("inside ex");
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response);
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error(ex.response.data);
      }
    }
  }

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          {this.renderInputFiels("username", "Username", true)}
          {this.renderInputFiels("password", "Password", false, "password")}
          {this.renderSubmitButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
