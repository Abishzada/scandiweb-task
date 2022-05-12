import React, { Component } from "react";
import Cartproductcard from "../../components/cart-product-card/cart-product-card";
import Navbar from "../../components/navbar/navbar";
import styles from "./cart.module.scss";
import { ApiContext } from "../../context/api.context";

export default class Cart extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      isCartPage: true,
    };
  }

  getTotalQuantity = () => {
    const { cartItems } = this.context;
    let a = 0;
    cartItems.map((item) => {
      a += item.quantity;
    });
    return a;
  };

  getTotalPrice = () => {
    const { cartItems, currentCurrency } = this.context;
    let priceSum = 0;
    let symbol;
    cartItems.map((item) => {
      const a = item.prices.filter(
        (price) => price.currency.symbol === currentCurrency
      );
      symbol = a[0].currency.symbol;
      priceSum += a[0].amount * item.quantity;
    });
    const result = symbol + Math.round(priceSum);
    return <>{result}</>;
  };

  render() {
    const { cartItems, isCartOpen } = this.context;
    return (
      <>
        <Navbar />
        <div
          className={
            isCartOpen ? `${styles.cartPage} ${styles.blur}` : styles.cartPage
          }
        >
          <div className={styles.title}>Cart</div>
          {cartItems &&
            cartItems.map((cartItem) => (
              <Cartproductcard
                cartItem={cartItem}
                isCartPage={this.state.isCartPage}
                key={cartItem.id}
              />
            ))}
          <div className={styles.total}>
            <div className={styles.tax}>
              <span className={styles.percentage}>Tax 21%:</span>
              <span className={styles.amount}>$300</span>
            </div>
            <div className={styles.quantity}>
              <span>Quantity:</span>
              <span>{this.getTotalQuantity()}</span>
            </div>
            <div className={styles.totalPrice}>
              <span>Total:</span>
              <span>{this.getTotalPrice()}</span>
            </div>
            <button className={styles.orderBtn}>order</button>
          </div>
        </div>
      </>
    );
  }
}
