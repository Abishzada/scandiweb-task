import React, { Component } from "react";
import Price from "../prices/prices";
import styles from "./productCard.module.scss";
import { ApiContext } from "../../context/api.context";
import { Link } from "react-router-dom";

export default class ProductCard extends Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
    };
  }

  componentDidMount = () => {};

  render() {
    const { fetchProductData, setActiveCategory } = this.context;
    const { product } = this.props;

    const fetchAndSet = (title) => {
      fetchProductData(title.id);
      setActiveCategory(title.category);
    };

    return product && product.inStock ? (
      <Link
        onClick={() => fetchAndSet(product)}
        to={`/product/${product.id}`}
        className={styles.cardRouter}
      >
        <div className={styles.cardContent}>
          <div
            className={styles.productImage}
            style={{
              backgroundImage: `url(${product.gallery[0]}) `,
            }}
          ></div>

          <div className={styles.titles}>
            <span className={styles.name}>{product ? product.name : null}</span>
            {product && product.prices
              ? product.prices.map((price) => {
                  return (
                    <span key={price.amount} className={styles.price}>
                      <Price price={price}></Price>
                    </span>
                  );
                })
              : null}
          </div>
        </div>
      </Link>
    ) : (
      <Link
        onClick={() => fetchProductData(product.id)}
        to={`/product/${product.id}`}
        className={styles.cardRouter}
        style={{
          opacity: 0.5,
        }}
      >
        <div className={styles.cardContent}>
          <div
            className={styles.productImage}
            style={{
              backgroundImage: `url(${product.gallery[0]})`,
              opacity: 0.5,
            }}
          ></div>
          <div className={styles.inStock}>OUT OF STOCK</div>

          <div className={styles.titles}>
            <span className={styles.name}>{product ? product.name : null}</span>
            {product && product.prices
              ? product.prices.map((price) => {
                  return (
                    <span key={price.amount} className={styles.price}>
                      <Price price={price}></Price>
                    </span>
                  );
                })
              : null}
          </div>
        </div>
      </Link>
    );
  }
}
