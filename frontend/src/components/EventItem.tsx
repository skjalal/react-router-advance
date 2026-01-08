import React, { type JSX } from "react";
import type { EventItemProps } from "../utils/data-types.ts";
import classes from "./EventItem.module.css";
import { Link } from "react-router-dom";

const EventItem: React.FC<EventItemProps> = ({ event }): JSX.Element => {
  const startDeleteHandler = (): void => {};
  return (
    <article className={classes.event}>
      <img src={event?.image} alt={event?.title} />
      <h1>{event?.title}</h1>
      <time>{event?.date}</time>
      <p>{event?.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
};
export default EventItem;
