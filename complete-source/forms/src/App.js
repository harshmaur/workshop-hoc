import React, { Component } from "react";
import "./App.css";
import withForm from "./withForm";

const Form = ({ handleChange, handleSubmit }) =>
  <form onChange={handleChange} onSubmit={handleSubmit}>
    <label htmlFor="name">Name</label>
    <input type="text" name="name" />
    <br />
    <label htmlFor="email">Email</label>
    <input type="email" name="email" />
    <br />
    <label htmlFor="phone">Phone</label>
    <input type="number" name="phone" />
    <br />
    <label htmlFor="address">Address</label>
    <input type="text" name="address" />
    <br />
    <button type="submit"> Submit</button>
  </form>;

const EnhancedForm = withForm({ url: "/", headers: { random: "random" } })(
  Form
);

class App extends Component {
  render() {
    return (
      <div>
        <h1> SIMPLE FORM </h1>
        <EnhancedForm />
      </div>
    );
  }
}

export default App;
