import React, { type JSX, useEffect, useState } from "react";

import EventsList from "../components/EventsList";
import type { Event, Data } from "../utils/data-types";

const EventsPage: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchedEvents, setFetchedEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/events");

      if (response.ok) {
        const resData: Data = await response.json();
        setFetchedEvents(resData.events);
      } else {
        setError("Fetching events failed.");
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
    </>
  );
};

export default EventsPage;
