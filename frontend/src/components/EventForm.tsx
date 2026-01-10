import React, { type JSX } from "react";
import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
} from "react-router-dom";

import classes from "./EventForm.module.css";
import type { EventFormProps, ErrorResponse } from "../utils/data-types";

const EventForm: React.FC<EventFormProps> = ({
  method,
  event,
}): JSX.Element => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData<ErrorResponse>();
  const cancelHandler = (): void => {
    navigate("..");
  };
  const isSubmitting: boolean = navigation.state === "submitting";
  console.log(method);

  return (
    <Form method="post" className={classes.form}>
      {data?.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={event?.title || ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          defaultValue={event?.image || ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          defaultValue={event?.date || ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
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
