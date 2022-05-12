import React, { Component } from "react";
import { ApiContext } from "../../context/api.context";
import styles from "./cartProductCard.module.scss";
import Price from "../price/price";
import Attributes from "../attributes/attributes";

export default class Cartproductcard extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      setCurrent: () => {},
    };
  }

  nextImage = (length) => {
    let { current } = this.state;
    current++;
    this.setState({ current: current });

    if (current < length) {
      this.setState({ current: current });
    } else {
      this.setState({ current: 0 });
    }
  };

  prevImage = (length) => {
    let { current } = this.state;
    if (current <= 0) {
      this.setState({ current: length - 1 });
    } else {
      current--;
      this.setState({ current: current });
    }
  };

  render() {
    const { cartItem } = this.props;
    const { isCartPage } = this.props;
    const { incrementItemQuantity, decrementItemQuantity } = this.context;
    const { current } = this.state;

    return (
      <div className={styles.content}>
        <div className={styles.details}>
          <div className={styles.title}>
            <div className={styles.name}>{cartItem.name}</div>
            <div>
              <Price isCartPage={isCartPage} prices={cartItem.prices} />
            </div>
          </div>
          <Attributes attributes={cartItem.attributes} />
        </div>
        <div className={styles.visual}>
          <div className={styles.counter}>
            <div
              onClick={() => incrementItemQuantity(cartItem)}
              className={styles.increment}
            >
              +
            </div>
            <div className={styles.quantity}>{cartItem.quantity}</div>
            <div
              onClick={() => decrementItemQuantity(cartItem)}
              className={styles.decrement}
            >
              -
            </div>
          </div>

          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${cartItem.gallery[current]})`,
            }}
          >
            <div className={styles.arrows}>
              <span
                onClick={() => this.prevImage(cartItem.gallery.length)}
              >{`<`}</span>
              <span
                onClick={() => this.nextImage(cartItem.gallery.length)}
              >{`>`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
