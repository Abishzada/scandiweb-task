import React, { Component } from "react";
import { ApiContext } from "../../context/api.context";
import Navbar from "../../components/navbar/navbar";
import styles from "./product.module.scss";
import Attributes from "../../components/attributes/attributes";
import Price from "../../components/price/price";
import ImageGallery from "../../components/image-gallery/image-gallery";
import { Interweave } from "interweave";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache: cache,
  uri: "http://localhost:4000/",
});
const GET_PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
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
`;

export default class Product extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      product: [],
      isCartOpen: false,
      isLoading: true,
      activeAttribute: null,
      activeColor: null,
    };
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    const { isCartOpen, setProductId } = this.context;
    this.setState({ isLoading: true });
    const currentUrl = window.location.href;
    const url = currentUrl.split("/");
    await client
      .query({ query: GET_PRODUCT, variables: { id: url[url.length - 1] } })
      .then((response) => {
        const result = response.data;
        this.setState(result);
      })
      .catch((error) => console.log(error));
    setProductId(url[url.length - 1]);

    setTimeout(() => {
      this.setState({
        isCartOpen: isCartOpen,
        inStock: this.state.product.inStock,
      });
      this.setState({ isLoading: false });
    }, 200);
  }

  fetchProductDataById = async (productId) => {
    await client
      .query({ query: GET_PRODUCT, variables: { id: productId } })
      .then((response) => {
        const result = response.data;
        this.setState({ product: result });
      })
      .catch((error) => console.log(error));
  };

  handleString = (prod) => {
    const { addProductToCart, setIsIconOnclick } = this.context;
    setIsIconOnclick(false);
    addProductToCart(prod);
  };

  render() {
    const { product, inStock, isLoading } = this.state;
    const { isCartOpen } = this.context;
    return isLoading ? (
      <h1>Loading</h1>
    ) : (
      <div ref={(ref) => (this.myRef = ref)}>
        <Navbar></Navbar>
        <div
          className={
            isCartOpen
              ? `${styles.productPage} ${styles.blur}`
              : styles.productPage
          }
        >
          <div className={styles.imageContainer}>
            {product && product.gallery
              ? product.gallery.map((image) => {
                  return <ImageGallery key={image} gallery={image} />;
                })
              : null}
          </div>
          <div className={styles.pageContent}>
            {inStock ? (
              <>
                <img
                  className={styles.productImage}
                  src={product && product.gallery && product.gallery[0]}
                  alt=""
                />
              </>
            ) : (
              <>
                <div className={styles.inStock}>OUT OF STOCK</div>
                <img
                  className={styles.productImage}
                  src={product && product.gallery && product.gallery[0]}
                  alt=""
                  style={{
                    opacity: 0.5,
                  }}
                />
              </>
            )}

            <div className={styles.contentDetails}>
              <p className={styles.brandTitle}>{product?.brand}</p>
              <p className={styles.prodTitle}> {product?.name} </p>
              {product && product.attributes ? (
                <Attributes attributes={product} />
              ) : null}
              {product && product.prices ? (
                <div className={styles.priceContainer}>
                  <Price prices={product?.prices} />
                </div>
              ) : null}
              {product && product.inStock ? (
                <button
                  onClick={() => {
                    this.handleString(product);
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
              <Interweave content={product?.description} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
