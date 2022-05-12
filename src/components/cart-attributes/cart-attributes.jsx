import React, { Component } from "react";
import styles from "./cart-attributes.module.scss";

export default class CartAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    attributes &&
      attributes.map((attr) => {
        switch (attr.id) {
          case "Color":
            this.setState({ isColor: true });
            this.setState({ colorTitle: attr.name });
            this.setState({ colorItems: attr.items });
            break;
          case "Capacity":
            this.setState({ isCapacity: true });
            this.setState({ capacityTitle: attr.name });
            this.setState({ capacityItems: attr.items });
            break;
          case "Size":
            this.setState({ isSize: true });
            this.setState({ sizeTitle: attr.name });
            this.setState({ sizeItems: attr.items });
            break;
        }
      });
  };

  render() {
    const {
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
                      <div className={styles.items} key={item.id}>
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
                      <div className={styles.items} key={item.id}>
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
                      key={item.id}
                      className={styles.color}
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
