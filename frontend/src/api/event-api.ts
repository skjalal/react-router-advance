import { data } from "react-router-dom";

export const eventLoader = async (): Promise<Response> => {
  const response = await fetch("http://localhost:3000/events1");

  if (response.ok) {
    return response;
  } else {
    throw data("Could not fetch events...", { status: 500 });
  }
};
