export const eventLoader = async (): Promise<Response> => {
  const response = await fetch("http://localhost:3000/events");

  if (response.ok) {
    return response;
  } else {
    throw new Error("Could not fetch events...");
  }
};
