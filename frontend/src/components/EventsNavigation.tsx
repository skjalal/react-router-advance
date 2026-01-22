import React, { type JSX } from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./EventsNavigation.module.css";

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? classes.active : undefined;
};

const EventsNavigation: React.FC = (): JSX.Element => {
  const token = useRouteLoaderData<string>("root");
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="" className={getNavLinkClass} end>
              All Events
            </NavLink>
          </li>
          {token !== "" && (
            <li>
              <NavLink to="new" className={getNavLinkClass}>
                New Event
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default EventsNavigation;
