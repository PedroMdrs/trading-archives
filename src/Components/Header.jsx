import React from "react";
import styles from "./Css/Header.module.css";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  return (
    <header>
      <nav className={`${styles.nav}`}>
        <Link
          to="/"
          aria-label="Trading Archives - Home"
          className={`${styles.title}`}
        >
          <Logo fill={"#fafafa"} />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
