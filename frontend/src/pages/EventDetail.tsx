import React, { Suspense, type JSX } from "react";
import { Await, Link, useRouteLoaderData } from "react-router-dom";
import type { DeferEventData } from "../utils/data-types";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetailPage: React.FC = (): JSX.Element => {
  const { event, events } = useRouteLoaderData<DeferEventData>("event-detail")!;

  return (
    <>
      <Suspense fallback={<p className="loader">Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p className="loader">Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
};

export default EventDetailPage;
