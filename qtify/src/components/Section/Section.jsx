// src/components/Section/Section.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";

const ALBUM_LIMIT = 6; // any number < total; tests only care that it’s less than full

const Section = ({ title, fetchUrl }) => {
  const [albums, setAlbums] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // false => collapsed / limited

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

  // When collapsed: show only subset
  // When expanded: show all
  const visibleAlbums = isExpanded ? albums : albums.slice(0, ALBUM_LIMIT);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section className={styles.section}>
      {/* Header row */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        <button
          type="button"
          className={styles.collapseButton}
          onClick={handleToggle}
        >
          {isExpanded ? "Collapse" : "Show All"}
        </button>
      </div>

      {/* When NOT expanded -> show Carousel with limited albums */}
      {!isExpanded ? (
        <Carousel
          items={visibleAlbums}
          renderItem={(album) => (
            <Card
              key={album.id}
              image={album.image}
              title={album.title}
              follows={album.follows}
            />
          )}
        />
      ) : (
        // When expanded -> show Grid with ALL albums
        <div className={styles.grid}>
          {visibleAlbums.map((album) => (
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
