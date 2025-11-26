// src/components/Carousel/Carousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import styles from "./Carousel.module.css";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

const Carousel = ({ items, renderItem }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={styles.container}>
      <Swiper
        spaceBetween={24}
        className={styles.swiper}
        breakpoints={{
          0: { slidesPerView: 1.5 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 6 },
        }}
      >
        <LeftNav />
        {items.map((item) => (
          <SwiperSlide key={item.id} className={styles.slide}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
        <RightNav />
      </Swiper>
    </div>
  );
};

export default Carousel;
