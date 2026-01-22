import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation.tsx";
import { getTokenDuration } from "../api/event-api.ts";

const RootLayout: React.FC = () => {
  const token = useLoaderData<string>();
  const submit = useSubmit();
  useEffect(() => {
    if (token === "" || token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
    } else {
      const tokenDuration = getTokenDuration();
      setTimeout(() => {
        submit(null, { action: "/logout", method: "post" });
      }, tokenDuration);
    }
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
