import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import PageContent from "../components/PageContent.tsx";
import type { ErrorResponse } from "../utils/data-types.ts";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  let title: string = "An error occurred!";
  let message: string = "Something went wrong!";
  if (isRouteErrorResponse(error)) {
    if (error.status === 500) {
      const data: ErrorResponse = JSON.parse(error.data);
      message = data.message;
    }
    if (error.status === 404) {
      title = "Not Found!";
      message = "Could not found resource or page!";
    }
  }

  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  );
};

export default ErrorPage;
