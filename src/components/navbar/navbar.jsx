import React, { Component } from "react";
import styles from "./navbar.module.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { CartIcon } from "../../assets/cart.jsx";
import { NavLink } from "react-router-dom";
import { ApiContext } from "../../context/api.context";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import Currency from "../currency/currency";
import onClickOutside from "react-onclickoutside";

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

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navlinks: NavLinks,
      isCurrencyOpen: null,
      isCartOpen: false,
    };
  }

  static contextType = ApiContext;

  componentDidMount() {
    const { isCurrencyOpen } = this.context;
    this.setState({ isCurrencyOpen: isCurrencyOpen });
  }

  toggleIsCartOpen = () => {
    const { setIsCartOpen } = this.context;
    setIsCartOpen(!this.state.isCartOpen);
    this.setState({ isCartOpen: !this.state.isCartOpen });
  };

  toggleCurrency = () => {
    const { setCurrency } = this.context;
    setCurrency(!this.state.isCurrencyOpen);
    this.setState({ isCurrencyOpen: !this.state.isCurrencyOpen });
  };

  handleClickOutside = () => {
    const { setCurrency } = this.context;
    setCurrency(false);
    this.setState({ isCurrencyOpen: false });
  };

  handleClickOutsideCart = () => {
    const { setIsCartOpen } = this.context;
    setIsCartOpen(false);
    this.setState({ isCartOpen: false });
  };

  handleOutsides = () => {
    this.handleClickOutside();
    this.handleClickOutsideCart();
  };
  fetchAndSet = (title) => {
    const { fetchDataByCategory, setActiveCategory } = this.context;
    fetchDataByCategory(title);
    setActiveCategory(title);
  };

  render() {
    const {
      activeCategory,
      cartQuantity,
      currencies,
      currentCurrency,
      isCartOpen,
      isCurrencyOpen,
    } = this.context;

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
                  this.fetchAndSet(navLink.title);
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
          <div
            className={styles.currency}
            onClick={() => this.toggleCurrency()}
          >
            <div className={styles.symbol}>
              {currentCurrency ? currentCurrency : null}
            </div>
            <span className={isCurrencyOpen ? styles.up : styles.down}></span>
            {isCurrencyOpen && (
              <div className={styles.currencyContainer}>
                {currencies
                  ? currencies.map((currency) => {
                      return (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          key={currency.label}
                        >
                          <Currency currency={currency} />
                        </div>
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

          {isCartOpen && <CartDropdown />}
        </div>
      </div>
    );
  }
}

var clickOutsideConfig = {
  handleClickOutside: function (instance) {
    return instance.handleOutsides;
  },
};

export default onClickOutside(Navbar, clickOutsideConfig);
