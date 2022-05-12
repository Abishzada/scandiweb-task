import React, { Component } from "react";
import CartDropdownItem from "../cart-dropdow-item/cart-dropdown-item";
import styles from "./cart-dropdown.module.scss";
import { ApiContext } from "../../context/api.context";
import { Link } from "react-router-dom";

export default class CartDropdown extends Component {
  static contextType = ApiContext;

  componentDidMount() {}

  getTotalQuantity = () => {
    const { cartItems } = this.context;
    let count = 0;
    cartItems.map((item) => {
      count += item.quantity;
    });
    return count;
  };

  getTotalPrice = () => {
    const { cartItems, currentCurrency } = this.context;
    let priceSum = 0;
    let symbol;
    cartItems.map((item) => {
      const activePrices = item.prices.filter(
        (price) => price.currency.symbol === currentCurrency
      );
      symbol = activePrices[0].currency.symbol;
      priceSum += activePrices[0].amount * item.quantity;
    });
    const result = symbol + Math.round(priceSum);
    return <>{result}</>;
  };
  render() {
    const { cartItems } = this.context;

    return (
      <div className={styles.cartDropdownContainer}>
        <div className={styles.cartContent}>
          <div className={styles.cartDetails}>
            <div className={styles.cartTitle}>
              My bag, <span> {this.getTotalQuantity()} items</span>
            </div>
            {cartItems
              ? cartItems.map((item) => {
                  return <CartDropdownItem key={item.id} item={item} />;
                })
              : null}
          </div>
          <div className={styles.cartTotal}>
            <span>Total</span>
            <span>{this.getTotalPrice()}</span>
          </div>
        </div>
        <div className={styles.cartButtons}>
          <button className={styles.view}>VIEW BAG</button>
          <Link to="/cart" className={styles.check}>
            CHECK OUT
          </Link>
        </div>
      </div>
    );
  }
}
