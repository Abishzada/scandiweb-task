import React, { Component } from "react";
import styles from "./price.module.scss";
import { ApiContext } from "../../context/api.context";

export default class Price extends Component {
  static contextType = ApiContext;

  render() {
    const { price } = this.props;
    const { currentCurrency } = this.context;

    return (
      <div className={styles.price}>
        {price.currency.symbol === currentCurrency
          ? price.currency.symbol + price.amount
          : null}
      </div>
    );
  }
}
