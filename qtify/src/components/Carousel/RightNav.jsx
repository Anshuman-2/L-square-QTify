// src/components/Carousel/RightNav.jsx
import React from "react";
import { useSwiper } from "swiper/react";
import { ReactComponent as RightIcon } from "../../assets/right-arrow.svg";
import styles from "./Carousel.module.css";

const RightNav = () => {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      className={`${styles.navButton} ${styles.right}`}
      onClick={() => swiper.slideNext()}
    >
      <RightIcon />
    </button>
  );
};

export default RightNav;
