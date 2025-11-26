// src/components/Navbar/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Button from "../Button/Button";

function Navbar({ searchData }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <div className={styles.center}>
        <Search
          placeholder="Search a song of your choice"
          searchData={searchData}
        />
      </div>

      <div className={styles.right}>
        <Button>Give Feedback</Button>
      </div>
    </nav>
  );
}

export default Navbar;
