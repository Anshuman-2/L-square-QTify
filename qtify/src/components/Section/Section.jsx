import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import Card from "../Card/Card";

const Section = ({ title, fetchUrl }) => {
  const [albums, setAlbums] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    console.log("Fetching API..."); // <-- ADD THIS

    const getAlbums = async () => {
      try {
        const { data } = await axios.get(fetchUrl);
        console.log("API Response:", data); // <-- ADD THIS
        setAlbums(data);
      } catch (e) {
        console.error("Error fetching albums:", e);
      }
    };

    getAlbums();
  }, [fetchUrl]);

  const displayedAlbums = collapsed ? albums.slice(0, 6) : albums;

  return (
    <section className={styles.section}>
      {/* Header row */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        <button
          type="button"
          className={styles.collapseButton}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? "Show All" : "Collapse"}
        </button>
      </div>

      {/* Grid of cards */}
      <div className={styles.grid}>
        {displayedAlbums.map((album) => (
          <Card
            key={album.id}
            image={album.image}
            title={album.title}
            follows={album.follows}
          />
        ))}
      </div>
    </section>
  );
};

export default Section;
