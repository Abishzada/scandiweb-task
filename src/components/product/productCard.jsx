/* eslint-disable react/prop-types */
import React, { Component } from "react";
import Price from "../prices/prices";
import styles from "./productCard.module.scss";
import { ApiContext } from "../../context/api.context";
import { Link } from "react-router-dom";
import CartProductIcon from "../../assets/cartProductIcon";
import ClickMuncher from "../helper/clickMuncher";

export default class ProductCard extends Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product || [],
      productId: "",
      style: {
        display: "none",
      },
    };
  }

  componentDidMount = () => {};

  handleActiveAttributes = (product) => {
    const {
      setActiveAttribute,
      setActiveColor,
      setIsIconOnclick,
    } = this.context;
    setIsIconOnclick(true);

    setTimeout(() => {
      product.attributes.map((attr) => {
        switch (attr.name) {
          case "Size":
            setActiveAttribute(attr.items[0]);
            break;
          case "Capacity":
            setActiveAttribute(attr.items[0]);
            break;
          case "Color":
            setActiveColor(attr.items[0]);
            break;
        }
      });
    }, 100);
  };

  handleAddCart = (product) => {
    const { addProductToCart } = this.context;

    setTimeout(() => {
      addProductToCart(product);
    }, 100);
  };

  setAndAdd = (product) => {
    this.handleActiveAttributes(product);
    setTimeout(() => {
      this.handleAddCart(product);
    }, 100);
  };

  fetchAndSet = async (title) => {
    const { fetchProductData, setActiveCategory, setProductId } =
      this.context;
    await fetchProductData(title.id);
    setProductId(title.id);
    setActiveCategory(title.category);
  };

  render() {
    const { product, style } = this.state;

    return product && product.inStock ? (
      <Link
        onClick={() => this.fetchAndSet(product)}
        to={`/product/${product.id}`}
        className={styles.cardRouter}
      >
        <div
          className={styles.cardContent}
          onMouseEnter={() => {
            this.setState({
              style: {
                display: "block",
              },
            });
          }}
          onMouseLeave={() => {
            this.setState({
              style: {
                display: "none",
              },
            });
          }}
        >
          <img
            className={styles.productImage}
            src={product.gallery[0]}
            alt={product.name}
          />
          <div
            onClick={() => this.setAndAdd(product)}
            style={style}
            className={styles.cartIconContainer}
          >
            <ClickMuncher>
              <CartProductIcon />
            </ClickMuncher>
          </div>
          <div className={styles.titles}>
            <span className={styles.name}>
              {product ? product.brand + " " + product.name : null}
            </span>
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
        onClick={() => this.fetchAndSet(product)}
        to={`/product/${product.id}`}
        className={styles.cardRouter}
        style={{
          opacity: 0.5,
        }}
      >
        <div className={styles.cardContent}>
          <img
            className={styles.productImage}
            src={product.gallery[0]}
            alt={product.name}
            style={{
              opacity: 0.5,
            }}
          />
          <div className={styles.inStock}>OUT OF STOCK</div>

          <div className={styles.titles}>
            <span className={styles.name}>
              {product ? product.brand + " " + product.name : null}
            </span>
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
