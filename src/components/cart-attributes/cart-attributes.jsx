/* eslint-disable react/prop-types */

import React, { Component } from "react";
import styles from "./cart-attributes.module.scss";
import { ApiContext } from "../../context/api.context";

export default class CartAttributes extends Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      activeAttribute: this.props.attributes.activeAttribute,
      activeColor: this.props.attributes.activeColor,
      capacityTitle: "",
      capacityItems: [],
      colorTitle: "",
      colorItems: [],
      sizeTitle: "",
      sizeItems: [],
      isCapacity: false,
      isColor: false,
      isSize: false,
    };
  }

  componentDidMount = () => {
    const { attributes } = this.props;

    attributes.attributes.map((attr) => {
      switch (attr.id) {
        case "Size":
          this.setState({ isSize: true });
          this.setState({ sizeTitle: attr.name });
          this.setState({ sizeItems: attr.items });
          break;
        case "Capacity":
          this.setState({ isCapacity: true });
          this.setState({ capacityTitle: attr.name });
          this.setState({ capacityItems: attr.items });
          break;
        case "Color":
          this.setState({ isColor: true });
          this.setState({ colorTitle: attr.name });
          this.setState({ colorItems: attr.items });
          break;
      }
    });
  };

  setActiveAttr = (item) => {
    this.setState({ activeAttribute: item });
  };

  setActiveColor = (item) => {
    this.setState({ activeColor: item });
  };

  handleActiveAttr = (item) => {
    this.setActiveAttr(item);
  };

  handleActiveColor = (item) => {
    this.setActiveColor(item);
  };

  render() {
    const {
      activeAttribute,
      activeColor,
      capacityTitle,
      capacityItems,
      colorTitle,
      colorItems,
      sizeTitle,
      sizeItems,
      isCapacity,
      isColor,
      isSize,
    } = this.state;

    return (
      <div className={styles.attributes}>
        {isCapacity ? (
          <div className={styles.capacityContainer}>
            <p className={styles.title}>{capacityTitle}:</p>
            <div className={styles.capacity}>
              {capacityItems
                ? capacityItems.map((item) => {
                    return (
                      <div
                        className={
                          activeAttribute === item
                            ? `${styles.items} ${styles.active}`
                            : styles.items
                        }
                        key={item.id}
                        onClick={() => this.handleActiveAttr(item)}
                      >
                        {item.value}
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        ) : null}

        {isSize ? (
          <div className={styles.capacityContainer}>
            <p className={styles.title}>{sizeTitle}:</p>
            <div className={styles.capacity}>
              {sizeItems
                ? sizeItems.map((item) => {
                    return (
                      <div
                        onClick={() => this.handleActiveAttr(item)}
                        className={
                          activeAttribute === item
                            ? `${styles.items} ${styles.active}`
                            : styles.items
                        }
                        key={item.id}
                      >
                        {item.value}
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        ) : null}

        {isColor ? (
          <div className={styles.colorContainer}>
            <p>{colorTitle}:</p>
            <div className={styles.colors}>
              {colorItems &&
                colorItems.map((item) => {
                  return (
                    <div
                      onClick={() => this.handleActiveColor(item)}
                      key={item.id}
                      className={
                        activeColor === item
                          ? `${styles.color} ${styles.active}`
                          : styles.color
                      }
                      style={{ backgroundColor: item.value }}
                    ></div>
                  );
                })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
