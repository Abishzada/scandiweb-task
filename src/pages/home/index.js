import React, { Component } from "react";
import { Navigate } from "react-router-dom";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navigate
        to={{
          pathname: "/categories/all",
        }}
      />
    );
  }
}
