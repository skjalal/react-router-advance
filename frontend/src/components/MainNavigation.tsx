import React, { type JSX } from "react";
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

import NewsletterSignup from "./NewsletterSignup.tsx";
import classes from "./MainNavigation.module.css";

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? classes.active : undefined;
};

const MainNavigation: React.FC = (): JSX.Element => {
  const token = useRouteLoaderData<string>("root");
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="" className={getNavLinkClass} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="events" className={getNavLinkClass}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="newsletter" className={getNavLinkClass}>
              Newsletter
            </NavLink>
          </li>
          {(token === "" || token === "EXPIRED") && (
            <li>
              <NavLink to="auth?mode=login" className={getNavLinkClass}>
                Authentication
              </NavLink>
            </li>
          )}
          {token !== "" && token !== "EXPIRED" && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
};

export default MainNavigation;
