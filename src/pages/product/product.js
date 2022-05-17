import React, { Component } from "react";
import { ApiContext } from "../../context/api.context";
import Navbar from "../../components/navbar/navbar";
import styles from "./product.module.scss";
import Attributes from "../../components/attributes/attributes";
import Price from "../../components/price/price";

export default class Product extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { activeCategory, setActiveCategory } = this.context;
    const currentUrl = window.location.href;
    const url = currentUrl.split("/");
    const { fetchProductData } = this.context;
    await fetchProductData(url[url.length - 1]);
  }

  render() {
    const { product, addProductToCart, isCartOpen } = this.context;
    return (
      <div>
        <Navbar></Navbar>
        <div
          className={
            isCartOpen
              ? `${styles.productPage} ${styles.blur}`
              : styles.productPage
          }
        >
          <div className={styles.imageContainer}>
            <div
              className={styles.sideImages}
              style={{
                backgroundImage: `url(${
                  product && product.gallery && product.gallery[0]
                }) `,
              }}
            ></div>
            <div
              className={styles.sideImages}
              style={{
                backgroundImage: `url(${
                  product && product.gallery && product.gallery[0]
                }) `,
              }}
            ></div>
            <div
              className={styles.sideImages}
              style={{
                backgroundImage: `url(${
                  product && product.gallery && product.gallery[0]
                }) `,
              }}
            ></div>
          </div>

          <div className={styles.pageContent}>
            <div
              className={styles.productImage}
              style={{
                backgroundImage: `url(${
                  product && product.gallery && product.gallery[0]
                }) `,
              }}
            ></div>

            <div className={styles.contentDetails}>
              <p className={styles.title}>{product.name}</p>
              {product && product.attributes ? (
                <Attributes attributes={product.attributes} />
              ) : null}

              {product && product.prices ? (
                <div className={styles.priceContainer}>
                  <Price prices={product.prices} />
                </div>
              ) : null}

              {product && product.inStock ? (
                <button
                  onClick={() => {
                    addProductToCart(product);
                  }}
                  className={styles.cartButton}
                >
                  add to cart
                </button>
              ) : (
                <button
                  onClick={() => {
                    alert("Unavailable In Sctock");
                  }}
                  className={styles.cartButton}
                >
                  add to cart
                </button>
              )}

              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
