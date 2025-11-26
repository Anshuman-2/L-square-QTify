import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Section = ({ title, fetchUrl, type = "album" }) => {
  if (type === "song") {
    return <SongsSection title={title} fetchUrl={fetchUrl} />;
  }

  return <AlbumsSection title={title} fetchUrl={fetchUrl} />;
};

export default Section;

const AlbumsSection = ({ title, fetchUrl }) => {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false); // false => carousel

  useEffect(() => {
    axios
      .get(fetchUrl)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error("Error fetching albums:", err));
  }, [fetchUrl]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button
          className={styles.collapseButton}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Collapse" : "Show All"}
        </button>
      </div>

      {showAll ? (
        <div className={styles.grid}>
          {albums.map((album) => (
            <Card
              key={album.id}
              image={album.image}
              title={album.title}
              follows={album.follows}
              type="album"
            />
          ))}
        </div>
      ) : (
        // Carousel view
        <Carousel
          items={albums}
          renderItem={(album) => (
            <Card
              key={album.id}
              image={album.image}
              title={album.title}
              follows={album.follows}
              type="album"
            />
          )}
        />
      )}
    </section>
  );
};

const SongsSection = ({ title, fetchUrl }) => {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    const fetchSongsAndGenres = async () => {
      try {
        const [songsRes, genresRes] = await Promise.all([
          axios.get(fetchUrl),
          axios.get("https://qtify-backend.labs.crio.do/genres"),
        ]);

        setSongs(songsRes.data);
        setGenres(genresRes.data.data || []);
      } catch (err) {
        console.error("Error fetching songs/genres:", err);
      }
    };

    fetchSongsAndGenres();
  }, [fetchUrl]);

  const handleTabChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  const filteredSongs =
    selectedGenre === "all"
      ? songs
      : songs.filter((song) => {
          const g = song.genre;
          if (!g) return false;
          if (typeof g === "string") return g === selectedGenre;
          if (g.key) return g.key === selectedGenre;
          return false;
        });

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <Tabs
        value={selectedGenre}
        onChange={handleTabChange}
        className={styles.tabs}
      >
        <Tab
          label="All"
          value="all"
          className={
            selectedGenre === "all" ? styles.tabItemActive : styles.tabItem
          }
        />

        {Array.isArray(genres) &&
          genres.map((genre) => (
            <Tab
              key={genre.key}
              label={genre.label}
              value={genre.key}
              className={
                selectedGenre === genre.key
                  ? styles.tabItemActive
                  : styles.tabItem
              }
            />
          ))}
      </Tabs>
      <Carousel
        items={filteredSongs}
        renderItem={(song) => (
          <Card
            key={song.id}
            image={song.image}
            title={song.title}
            likes={song.likes}
            type="song"
          />
        )}
      />
    </section>
  );
};
