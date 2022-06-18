import React, { Component } from "react";

export default class ClickMuncher extends Component {
  render() {
    return <div onClick={(e) => e.preventDefault()}>{this.props.children}</div>;
  }
}
