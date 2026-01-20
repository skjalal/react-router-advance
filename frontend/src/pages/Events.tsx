import React, { type JSX, Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";

import EventsList from "../components/EventsList";
import type { DeferData } from "../utils/data-types";

const EventsPage: React.FC = (): JSX.Element => {
  const { events } = useLoaderData<DeferData>();
  return (
    <Suspense fallback={<p className="loader">Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
};

export default EventsPage;
