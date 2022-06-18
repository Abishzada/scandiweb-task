import React, { Component } from "react";
import CartAttributes from "../cart-attributes/cart-attributes";
import CartPrices from "../cartPrices/cartPrices";
import Price from "../price/price";
import styles from "./cart-dropdown-item.module.scss";
import { ApiContext } from "../../context/api.context";

export default class CartDropdownItem extends Component {
  static contextType = ApiContext;

  render() {
    const { incrementItemQuantity, decrementItemQuantity } = this.context;

    const { item } = this.props;

    return (
      <div className={styles.itemContent}>
        <div className={styles.itemDetails}>
          <div className={styles.details}>
            <div className={styles.title}>
              <div className={styles.brand}>{item.brand}</div>
              <div className={styles.name}>{item.name}</div>
              <div>
                <CartPrices prices={item.prices} />
              </div>
            </div>
            <CartAttributes attributes={item} />
          </div>
          <div className={styles.itemCounter}>
            <div
              onClick={() => incrementItemQuantity(item)}
              className={styles.increment}
            >
              +
            </div>
            <div className={styles.quantity}>{item.quantity}</div>
            <div
              onClick={() => decrementItemQuantity(item)}
              className={styles.decrement}
            >
              -
            </div>
          </div>
          {item && item.gallery ? (
            <img
              className={styles.itemImage}
              src={item.gallery[0]}
              alt={item.value}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
