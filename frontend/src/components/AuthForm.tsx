import React, { type JSX } from "react";
import { useState } from "react";
import { Form } from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm: React.FC = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const switchAuthHandler = (): void =>
    setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);

  return (
    <Form method="post" className={classes.form}>
      <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </p>
      <p>
        <label htmlFor="image">Password</label>
        <input id="password" type="password" name="password" required />
      </p>
      <div className={classes.actions}>
        <button onClick={switchAuthHandler} type="button">
          {isLogin ? "Create new user" : "Login"}
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
};

export default AuthForm;
