import React, { type JSX } from "react";

import classes from "./MainNavigation.module.css";

const MainNavigation: React.FC = (): JSX.Element => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Events</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
