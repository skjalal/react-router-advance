import { data, type LoaderFunctionArgs, redirect } from "react-router-dom";

import type {
  Event,
  Data,
  DeferData,
  DeferEventData,
  ErrorResponse,
} from "../utils/data-types.ts";

async function loadEvents(): Promise<Event[]> {
  const response = await fetch("http://localhost:3000/events");

  if (response.ok) {
    const data: Data = await response.json();
    return data.events;
  } else {
    const error: ErrorResponse = { message: "Could not fetch events..." };
    throw data(JSON.stringify(error), { status: response.status });
  }
}

async function loadEvent(id: string): Promise<Event> {
  const response = await fetch(`http://localhost:3000/events/${id}`);

  if (response.ok) {
    const { event } = await response.json();
    return event;
  } else {
    const error: ErrorResponse = { message: "Could not fetch events..." };
    throw data(JSON.stringify(error), { status: response.status });
  }
}

export const eventLoader = (): DeferData => {
  return { events: loadEvents() };
};

export const eventLoaderById = (args: LoaderFunctionArgs): DeferEventData => {
  const { params } = args;
  const id = params.eventId!;
  return { event: loadEvent(id), events: loadEvents() };
};

export const saveOrEditEventAction = async (
  args: LoaderFunctionArgs,
): Promise<Response> => {
  const { request, params } = args;
  const eventId: string = params.eventId || "";
  const method: string = request.method;
  const requestData = await request.formData();
  const eventData: Event = {
    id: eventId,
    title: requestData.get("title") as string,
    image: requestData.get("image") as string,
    date: requestData.get("date") as string,
    description: requestData.get("description") as string,
  };
  let url = "http://localhost:3000/events/";
  if (method === "PUT") {
    url = "http://localhost:3000/events/" + eventId;
  }
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.ok) {
    return redirect("/events");
  } else if (response.status === 422) {
    return response;
  } else {
    const error: ErrorResponse = {
      message: "Failed to save new event",
    };
    throw data(JSON.stringify(error), { status: response.status });
  }
};

export const removeEventById = async (
  args: LoaderFunctionArgs,
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

export const newsletterAction = async (
  args: LoaderFunctionArgs,
): Promise<Response> => {
  const { request } = args;
  const data = await request.formData();
  const email = data.get("email") as string;

  // send to backend newsletter server ...
  console.log(email);
  const response = { message: "Signup successful!" };
  const jsonBody = JSON.stringify(response);
  const options = {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return new Response(jsonBody, options);
};
