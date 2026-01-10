import { data, type LoaderFunctionArgs, redirect } from "react-router-dom";
import type { ErrorResponse } from "../utils/data-types";
import type { Event } from "../utils/data-types.ts";

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

export const saveEventAction = async (
  args: LoaderFunctionArgs
): Promise<Response> => {
  const { request } = args;
  const requestData = await request.formData();
  const eventData: Event = {
    id: "",
    title: requestData.get("title") as string,
    image: requestData.get("image") as string,
    date: requestData.get("date") as string,
    description: requestData.get("description") as string,
  };
  const response = await fetch("http://localhost:3000/events/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.ok) {
    return redirect("/events");
  } else {
    const error: ErrorResponse = {
      message: "Failed to save new event",
    };
    throw data(JSON.stringify(error), { status: response.status });
  }
};

export const removeEventById = async (
  args: LoaderFunctionArgs
): Promise<Response> => {
  const { params, request } = args;
  const id = params.eventId;
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: request.method,
  });

  if (response.ok) {
    return redirect("/events");
  } else {
    const error: ErrorResponse = {
      message: `Could not delete event of id: ${id}`,
    };
    throw data(JSON.stringify(error), { status: response.status });
  }
};
