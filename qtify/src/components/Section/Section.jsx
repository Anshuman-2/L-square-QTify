// src/components/Section/Section.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";

const Section = ({ title, fetchUrl }) => {
  const [albums, setAlbums] = useState([]);
  const [showCarousel, setShowCarousel] = useState(false);

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const { data } = await axios.get(fetchUrl);
        setAlbums(data);
      } catch (e) {
        console.error("Error fetching albums:", e);
      }
    };

    getAlbums();
  }, [fetchUrl]);

  return (
    <section className={styles.section}>
      {/* Header row */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        <button
          type="button"
          className={styles.collapseButton}
          onClick={() => setShowCarousel((prev) => !prev)}
        >
          {showCarousel ? "Show All" : "Collapse"}
        </button>
      </div>

      {/* Conditional rendering: Grid vs Carousel */}
      {showCarousel ? (
        <Carousel
          items={albums}
          renderItem={(album) => (
            <Card
              image={album.image}
              title={album.title}
              follows={album.follows}
            />
          )}
        />
      ) : (
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
      )}
    </section>
  );
};

export default Section;
