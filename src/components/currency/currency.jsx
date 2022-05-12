import React, { Component } from "react";
import styles from "./currency.module.scss";
import { ApiContext } from "../../context/api.context";

export default class Currency extends Component {
  static contextType = ApiContext;

  render() {
    const { currency } = this.props;
    const { setCurrentCurrency } = this.context;
    return (
      <div
        className={styles.currencies}
        onClick={() => setCurrentCurrency(currency.symbol)}
      >
        {currency.symbol} {currency.label}
      </div>
    );
  }
}
