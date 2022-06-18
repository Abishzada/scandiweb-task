import React, { Component } from "react";
import styles from "./image-gallery.module.scss";

export default class ImageGallery extends Component {
  render() {
    const { gallery } = this.props;
    return (
      <div className={styles.imageContainer}>
        <img className={styles.sideImages} src={gallery} alt="" />
      </div>
    );
  }
}
