import { data, type LoaderFunctionArgs } from "react-router-dom";
import type { ErrorResponse } from "../utils/data-types";

export const eventLoader = async (): Promise<Response> => {
  const response = await fetch("http://localhost:3000/events");

  if (response.ok) {
    return response;
  } else {
    const error: ErrorResponse = { message: "Could not fetch events..." };
    throw data(JSON.stringify(error), { status: response.status });
  }
};

export const eventLoaderById = async (
  args: LoaderFunctionArgs
): Promise<Response> => {
  const { params } = args;
  const id = params.eventId;
  const response = await fetch(`http://localhost:3000/events/${id}`);

  if (response.ok) {
    return response;
  } else {
    const error: ErrorResponse = {
      message: `Could not fetch event of id: ${id}`,
    };
    throw data(JSON.stringify(error), { status: response.status });
  }
};
