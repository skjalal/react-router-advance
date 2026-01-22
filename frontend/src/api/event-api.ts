import { data, type LoaderFunctionArgs, redirect } from "react-router-dom";

import type {
  Event,
  User,
  Data,
  DeferData,
  DeferEventData,
  ErrorResponse,
  AuthResponse,
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

const getAuthToken = (): string => {
  const token: string = localStorage.getItem("token") || "";
  return token;
};

export const checkAuthLoader = () => {
  const token = getAuthToken();
  if (token === "") {
    return redirect("/auth");
  }
  return null;
};

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
  const token = getAuthToken();
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
      Authorization: `Bearer ${token}`,
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
  const token = getAuthToken();
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: request.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

export const authAction = async (
  args: LoaderFunctionArgs,
): Promise<Response> => {
  const { request } = args;
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    const error: ErrorResponse = {
      message: "Unsupported mode!",
    };
    throw data(JSON.stringify(error), { status: 422 });
  }
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const authData: User = { email, password };

  const response = await fetch(`http://localhost:3000/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (response.ok) {
    const resData: AuthResponse = await response.json();
    const token = resData.token!;
    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());
    return redirect("/");
  } else {
    throw data(JSON.stringify({ message: "Could not authenticate user." }), {
      status: 500,
    });
  }
};

export const logoutAction = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/");
};

export const tokenLoader = (): string => {
  const token: string = localStorage.getItem("token") || "";
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
};

export const getTokenDuration = (): number => {
  const storedExpirationDate = localStorage.getItem("expiration") as string;
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};
