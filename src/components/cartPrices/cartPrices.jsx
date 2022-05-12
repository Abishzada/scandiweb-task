import React, { Component } from "react";
import styles from "./cartPrices.module.scss";
import { ApiContext } from "../../context/api.context";

export default class CartPrices extends Component {
  static contextType = ApiContext;

  getPrice = () => {
    const { prices } = this.props;
    const { currentCurrency } = this.context;
    const result =
      prices &&
      prices.map((p) => {
        if (p.currency.symbol === currentCurrency) {
          return p.currency.symbol + p.amount;
        }
      });
    return <div className={styles.price}>{result}</div>;
  };

  render() {
    return this.getPrice();
  }
}
