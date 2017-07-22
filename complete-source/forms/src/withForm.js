import React, { Component } from "react";

const withForm = apiObject => WrappedComponent =>
  class extends Component {
    state = apiObject.defaultValues;

    handleInput = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
      e.preventDefault();
      // Make api calls
      console.log(apiObject);
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          handleChange={this.handleInput}
          handleSubmit={this.handleSubmit}
        />
      );
    }
  };

export default withForm;
