import React, { type JSX, useEffect } from "react";
import { useFetcher } from "react-router-dom";

import type { SignupResponse } from "../utils/data-types.ts";
import classes from "./NewsletterSignup.module.css";

const NewsletterSignup: React.FC = (): JSX.Element => {
  const { Form, data, state } = useFetcher<SignupResponse>();

  useEffect(() => {
    if (state === "idle" && data?.message) {
      globalThis.alert(data.message);
    }
  }, [data, state]);

  return (
    <Form method="post" action="/newsletter" className={classes.newsletter}>
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button type="submit">Sign up</button>
    </Form>
  );
};

export default NewsletterSignup;
