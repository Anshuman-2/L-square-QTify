import React from "react";
import styles from "./Hero.module.css";
import heroHeadphones from "../../assets/image copy.png";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>100 Thousand Songs, ad-free</h1>
        <h2>Over thousands podcast episodes</h2>
      </div>

      <div className={styles.imageWrapper}>
        <img src={heroHeadphones} alt="Headphones" />
      </div>
    </section>
  );
};

export default Hero;
