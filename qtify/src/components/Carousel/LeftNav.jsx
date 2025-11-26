// src/components/Carousel/LeftNav.jsx
import React from "react";
import { useSwiper } from "swiper/react";
import { ReactComponent as LeftIcon } from "../../assets/left-arrow.svg";
import styles from "./Carousel.module.css";

const LeftNav = () => {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      className={`${styles.navButton} ${styles.left}`}
      onClick={() => swiper.slidePrev()}
    >
      <LeftIcon />
    </button>
  );
};

export default LeftNav;
