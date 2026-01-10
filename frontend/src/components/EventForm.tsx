import React, { type JSX } from "react";
import { useNavigate, Form, useNavigation } from "react-router-dom";

import classes from "./EventForm.module.css";
import type { EventFormProps } from "../utils/data-types";

const EventForm: React.FC<EventFormProps> = ({
  method,
  event,
}): JSX.Element => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const cancelHandler = (): void => {
    navigate("..");
  };
  const isSubmitting: boolean = navigation.state === "submitting";
  console.log(method);

  return (
    <Form method="post" className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event?.title || ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event?.image || ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event?.date || ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          defaultValue={event?.description || ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
};

export default EventForm;
