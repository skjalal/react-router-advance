import React, { type JSX } from "react";
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? classes.active : undefined;
};

const MainNavigation: React.FC = (): JSX.Element => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={getNavLinkClass} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={getNavLinkClass}>
              Events
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
