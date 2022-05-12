import React, { Component } from "react";
import styles from "./price.module.scss";
import { ApiContext } from "../../context/api.context";

export default class Price extends Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
    };
  }

  componentDidMount = () => {
    this.setState(this.props);
  };

  getPrice = () => {
    const { prices } = this.props;
    const { currentCurrency } = this.context;
    const result = prices.map((price) => {
      if (price.currency.symbol === currentCurrency) {
        return price.currency.symbol + price.amount;
      }
    });
    return <div>{result}</div>;
  };

  render() {
    const { isCartPage } = this.props;
    return (
      <>
        {isCartPage ? null : <div className={styles.priceTitle}>Price: </div>}
        <div className={styles.price}>{this.getPrice()}</div>
      </>
    );
  }
}
