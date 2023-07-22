import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className={`${styles.nav}`}>
        <Link
          to="/"
          aria-label="Trading Archives - Home"
          className={`${styles.link}`}
        >
          <div className={`${styles.logo}`}>
            <p>Trading Archives</p>
          </div>
          {/* <div className={`${styles.logo}`}>
            <Logo />
          </div> */}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
