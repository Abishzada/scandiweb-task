import React, { Component } from "react";
import Navbar from "../../components/navbar/navbar";
import styles from "./category.module.scss";
import ProductCard from "../../components/product/productCard";
import { ApiContext } from "../../context/api.context";

class Category extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    const { activeCategory, setActiveCategory } = this.context;
    const currentUrl = window.location.href;
    const url = currentUrl.split("/");
    setActiveCategory(url[url.length - 1]);
  }

  render() {
    const { category, isCartOpen } = this.context;

    return (
      <div>
        <Navbar></Navbar>
        <div
          className={
            isCartOpen
              ? `${styles.blur} ${styles.categoryContent}`
              : styles.categoryContent
          }
        >
          <div className={styles.title}>{category.name}</div>
          <div className={styles.content}>
            {category && category.products
              ? category.products.map((product) => {
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                    ></ProductCard>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
