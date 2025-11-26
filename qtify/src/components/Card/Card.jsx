import React from "react";
import styles from "./Card.module.css";
import Chip from "@mui/material/Chip";

const Card = ({ image, title, follows, likes, type = "album" }) => {
  // label changes based on type
  const chipLabel =
    type === "song" ? `${likes} Likes` : `${follows} Follows`;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} />
        <Chip
          label={chipLabel}
          className={styles.chip}
          size="small"
        />
      </div>

      <div className={styles.bottom}>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
};

export default Card;
