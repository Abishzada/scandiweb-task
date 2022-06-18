import React, { Component } from "react";
import Navbar from "../../components/navbar/navbar";
import styles from "./category.module.scss";
import ProductCard from "../../components/product/productCard";
import { ApiContext } from "../../context/api.context";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache: cache,
  uri: "http://localhost:4000/",
});
const GET_CATEGORY = gql`
  query ($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

class Category extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      activeCategory: "",
      category: [],
      isCartOpen: false,
    };
  }

  componentDidMount = async () => {
    const { isCartOpen, activeCategory, category } = this.context;
    this.setState({
      activeCategory: activeCategory,
      category: category,
      isCartOpen: isCartOpen,
    });
    const currentUrl = window.location.href;
    const url = currentUrl.split("/");
    if (category.length) {
      this.setState({ category: category });
    } else {
      await client
        .query({
          query: GET_CATEGORY,
          variables: { title: url[url.length - 1] },
        })
        .then((response) => {
          const result = response.data;
          this.setState(result);
        })
        .catch((error) => console.log(error));
    }

    if (this.state.activeCategory === url[url.length - 1]) {
      this.setState({ activeCategory: url[url.length - 1] });
    }

    this.setState({
      activeCategory: activeCategory,
      isCartOpen: isCartOpen,
    });
  };

  capitalizeFirstLetter(str) {
    return str && str[0].toUpperCase() + str.slice(1);
  }

  render() {
    const { isCartOpen, category } = this.context;
    const { setIsIconOnclick } = this.context;

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
          <div className={styles.title}>
            {this.capitalizeFirstLetter(category.name)}
          </div>
          <div className={styles.content}>
            {category && category.products
              ? category.products.map((product) => {
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      setIsIconOnclick={setIsIconOnclick}
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
