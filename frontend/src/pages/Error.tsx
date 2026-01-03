import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import PageContent from "../components/PageContent.tsx";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  const title: string = "An error occurred!";
  let message: string = "Something went wrong!";
  if (isRouteErrorResponse(error)) {
    message = error.data;
  }
  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  );
};

export default ErrorPage;
