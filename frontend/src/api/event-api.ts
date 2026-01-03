import type { Data } from "../utils/data-types.ts";

export const eventLoader = async (): Promise<Response> => {
  const response = await fetch("http://localhost:3000/events");

  if (response.ok) {
    return response;
  }
  const data: Data = {
    isError: true,
    message: "Could not fetch events...",
    events: [],
  };
  return new Response(JSON.stringify(data), { status: 500 });
};
