/* eslint-disable react/prop-types */
import React, { Component, createContext } from "react";
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

const GET_CURRENCY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const ApiContext = createContext();

export default class ApiContextData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAttributes: null,
      activeCategory: "",
      activeAttribute: null,
      activeColor: null,
      category: [],
      categoryName: "",
      categoryOnUrl: "",
      cartItems: [],
      cartQuantity: 0,
      currencies: [],
      currentCurrency: "$",
      inStock: true,
      isActive: false,
      isCartOpen: false,
      isCurrencyOpen: false,
      isIconOnclick: false,
      product: [],
      productId: "",
      addProductToCart: (productToCart) => this.addProductToCart(productToCart),
      decrementItemQuantity: (item) => this.decrementItemQuantity(item),
      fetchDataByCategory: async (categoryTitle) => {
        await client
          .query({ query: GET_CATEGORY, variables: { title: categoryTitle } })
          .then((response) => {
            const result = response.data;
            this.setState(result);
          })
          .catch((error) => console.log(error));
      },
      fetchProductData: async (productId) => {
        await client
          .query({
            query: GET_PRODUCT,
            variables: { id: productId && productId },
          })
          .then((response) => {
            const result = response.data;
            this.setState(result);
          })
          .catch((error) => console.log(error));
      },
      incrementItemQuantity: (item) => this.incrementItemQuantity(item),
      setActiveCategory: (title) => {
        this.setState({ activeCategory: title });
      },
      setActiveAttribute: (item) => {
        this.setState({ activeAttribute: item });
      },
      setActiveColor: (item) => {
        this.setState({ activeColor: item });
      },

      setCartItemQuantity: () => {
        const { cartItems } = this.state;
        let a = 0;
        cartItems.map((item) => {
          a += item.quantity;
        });
        this.setState({ cartQuantity: a });
      },
      setCartItems: (item) => {
        this.setState({ cartItems: item });
        this.getCartItemQuantity();
      },
      setCurrency: (bool) => {
        this.setState({ isCurrencyOpen: bool });
      },
      setCurrentCurrency: (symbol) => {
        this.setState({ currentCurrency: symbol });
        setTimeout(() => {}, 1000);
      },
      setIsIconOnclick: (setIsIconOnclick) => {
        this.setIsIconOnclick(setIsIconOnclick);
      },
      setIsCartOpen: (bool) => {
        this.setState({ isCartOpen: bool });
      },
      setInSctok: (productInStock) => {
        this.setState({ inStock: productInStock });
      },
      setProductId: (id) => {
        this.setState({ productId: id });
      },
    };
  }

  componentDidMount = async () => {
    await this.fetchCategoryData();
    await this.fetchCurrencyData();
  };

  fetchCategoryData = async () => {
    const currentUrl = window.location.href;
    const url = currentUrl.split("/");
    this.setState({ activeCategory: url[url.length - 1] });
    await client
      .query({
        query: GET_CATEGORY,
        variables: { title: url[url.length - 1] },
      })
      .then((response) => {
        this.setState(response.data);
      })
      .catch((error) => console.log(error));
  };

  fetchProductDataById = async (productId) => {
    await client
      .query({ query: GET_PRODUCT, variables: { id: productId && productId } })
      .then((response) => {
        const result = response.data;
        this.setState(result);
      })
      .catch((error) => console.log(error));
  };

  fetchCurrencyData = async () => {
    await client
      .query({ query: GET_CURRENCY })
      .then((response) => {
        const result = response.data;
        this.setState(result);
      })
      .catch((error) => console.log(error));

    this.setState();
  };

  addProductToCart = (productToCart) => {
    const {
      cartItems,
      setCartItems,
      activeAttribute,
      activeColor,
      isIconOnclick,
    } = this.state;

    if ((activeAttribute || activeColor) && !isIconOnclick) {
      const existingCartItem = cartItems.find(
        (cartItem) => cartItem === productToCart
      );

      if (existingCartItem) {
        return cartItems.map((cartItem) =>
          cartItem.id === productToCart.id
            ? {
                ...cartItem,
                quantity: productToCart.quantity + 1,
                activeAttribute: activeAttribute,
                activeColor: activeColor,
              }
            : cartItem
        );
      } else {
        cartItems.push({
          ...productToCart,
          quantity: 1,
          activeAttribute: activeAttribute,
          activeColor: activeColor,
        });
      }

      setCartItems(cartItems);
      this.getCartItemQuantity();
    } else if (isIconOnclick) {
      if (activeAttribute || activeColor) {
        cartItems.push({
          ...productToCart,
          quantity: 1,
          activeAttribute: activeAttribute,
          activeColor: activeColor,
        });
      } else {
        cartItems.push({
          ...productToCart,
          quantity: 1,
          activeAttribute: activeAttribute,
          activeColor: activeColor,
        });
      }
      setCartItems(cartItems);
      this.getCartItemQuantity();
    } else {
      alert("Size or Color should be chosen");
    }
  };

  getCartItemQuantity = (items) => {
    const { cartItems } = this.state;
    let a = 0;
    !items
      ? cartItems.map((item) => {
          a += item.quantity;
        })
      : items.map((item) => (a += item.quantity));
    this.setState({ cartQuantity: a });
  };

  decrementItemQuantity = (item) => {
    item.quantity > 0 ? item.quantity-- : this.deleteItemCart(item);
    if (item.quantity > 1) {
      item.quantity--;
    } else if (item.quantity == 0) {
      this.deleteItemCart(item);
    }
    this.setState({ ...this.state.cartItems });
    this.getCartItemQuantity();
  };

  deleteItemCart = (item) => {
    const { cartItems, setCartItems } = this.state;
    const filteredCartItems = cartItems.filter((cartItem) => cartItem !== item);

    setCartItems(filteredCartItems);
    this.getCartItemQuantity(filteredCartItems);
  };

  incrementItemQuantity = (item) => {
    item.quantity++;
    this.setState({ ...this.state.cartItems });
    this.getCartItemQuantity();
  };

  setActiveCategory = (categoryTitle) => {
    this.setState({ activeCategory: categoryTitle });
  };

  setActiveAttribute = (item) => {
    this.setState({ activeAttribute: item });
  };

  setActiveColor = (item) => {
    this.setState({ activeColor: item });
  };

  setIsIconOnclick = (isIconOnclick) => {
    this.setState({ isIconOnclick: isIconOnclick });
  };

  render() {
    return (
      <ApiContext.Provider value={this.state}>
        {this.props.children}
      </ApiContext.Provider>
    );
  }
}
