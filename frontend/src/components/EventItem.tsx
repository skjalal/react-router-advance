import React, { type JSX } from "react";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

import type { EventItemProps } from "../utils/data-types.ts";
import classes from "./EventItem.module.css";

const EventItem: React.FC<EventItemProps> = ({ event }): JSX.Element => {
  const token = useRouteLoaderData<string>("root");
  const submit = useSubmit();
  const startDeleteHandler = (): void => {
    const proceed: boolean = globalThis.confirm("Are you sure?");
    if (proceed) {
      submit(null, { method: "delete" });
    }
  };
  return (
    <article className={classes.event}>
      <img src={event?.image} alt={event?.title} />
      <h1>{event?.title}</h1>
      <time>{event?.date}</time>
      <p>{event?.description}</p>
      {token !== "" && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
};
export default EventItem;
