import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";

const Section = ({ title, fetchUrl }) => {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false); // false = show carousel

  useEffect(() => {
    axios.get(fetchUrl).then((res) => {
      setAlbums(res.data); // FULL API DATA
    }).catch((err) => {
      console.error("Error fetching albums:", err);
    });
  }, [fetchUrl]);

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button
          className={styles.collapseButton}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Collapse" : "Show All"}
        </button>
      </div>

      {/* 🎯 IMPORTANT – show ALL cards when showAll = true */}
      {showAll ? (
        // FULL GRID (must match API count)
        <div className={styles.grid}>
          {albums.map((album) => (
            <Card
              key={album.id}
              image={album.image}
              title={album.title}
              follows={album.follows}
            />
          ))}
        </div>
      ) : (
        // Carousel view (subset is allowed here)
        <Carousel
          items={albums}
          renderItem={(album) => (
            <Card
              key={album.id}
              image={album.image}
              title={album.title}
              follows={album.follows}
            />
          )}
        />
      )}
    </section>
  );
};

export default Section;
