import React, { Component } from "react";
import styles from "./navbar.module.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { CartIcon } from "../../assets/cart.jsx";
import { NavLink } from "react-router-dom";
import { ApiContext } from "../../context/api.context";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import Currency from "../currency/currency";

const NavLinks = [
  {
    title: "all",
    url: "/categories/all",
    id: "848484828392332",
    active: true,
  },
  {
    title: "clothes",
    url: "/categories/clothes",
    id: "1321314134134",
    active: true,
  },
  {
    title: "tech",
    url: "/categories/tech",
    id: "131231231231",
    active: true,
  },
];

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navlinks: NavLinks,
    };
  }

  static contextType = ApiContext;

  toggleIsCartOpen = () => {
    const { setIsCartOpen } = this.context;
    setIsCartOpen();
  };

  toggleCurrency = () => {
    const { setCurrency } = this.context;
    setCurrency();
  };

  render() {
    const {
      activeCategory,
      cartQuantity,
      currencies,
      currentCurrency,
      fetchDataByCategory,
      isCartOpen,
      isCurrencyOpen,
      setActiveCategory,
    } = this.context;

    const fetchAndSet = (title) => {
      fetchDataByCategory(title);
      setActiveCategory(title);
    };

    return (
      <div className={styles.navbar}>
        <div className={styles.categories}>
          {this.state.navlinks.map((navLink) => {
            return (
              <NavLink
                className={
                  navLink.title === activeCategory ? styles.isActive : null
                }
                key={navLink.id}
                onClick={() => {
                  fetchAndSet(navLink.title);
                }}
                to={navLink.url}
              >
                {navLink.title.toUpperCase()}
              </NavLink>
            );
          })}
        </div>
        <div className={styles.icon}>
          <div className={styles.logoArea}>
            <Logo className={styles.logo} />
          </div>
        </div>
        <div className={styles.cart}>
          <div className={styles.currency} onClick={this.toggleCurrency}>
            <div className={styles.symbol}>
              {currentCurrency ? currentCurrency : null}
            </div>
            <span className={isCurrencyOpen ? styles.up : styles.down}></span>
            {isCurrencyOpen && (
              <div className={styles.currencyContainer}>
                {currencies
                  ? currencies.map((currency) => {
                      return (
                        <Currency key={currency.label} currency={currency} />
                      );
                    })
                  : null}
              </div>
            )}
          </div>

          <div onClick={this.toggleIsCartOpen} className={styles.cartIcon}>
            <div>
              <CartIcon></CartIcon>
            </div>
            <div className={styles.cartIndex}>{cartQuantity}</div>
          </div>
          {isCartOpen && <CartDropdown></CartDropdown>}
        </div>
      </div>
    );
  }
}
