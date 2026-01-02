import type { Data, Event } from "../utils/data-types";

export const eventLoader = async (): Promise<Event[]> => {
  const response = await fetch("http://localhost:3000/events");

  if (response.ok) {
    const resData: Data = await response.json();
    return resData.events;
  } else {
    console.error("Fetching events failed.");
  }
  return [];
};
