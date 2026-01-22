import React, { Suspense, type JSX } from "react";
import EventForm from "../components/EventForm";
import { Await, useRouteLoaderData } from "react-router-dom";
import type { DeferEventData } from "../utils/data-types";

const EditEventPage: React.FC = (): JSX.Element => {
  const { event } = useRouteLoaderData<DeferEventData>("event-detail")!;

  return (
    <Suspense fallback={<p className="loader">Loading...</p>}>
      <Await resolve={event}>
        {(loadedEvent) => <EventForm method="put" event={loadedEvent} />}
      </Await>
    </Suspense>
  );
};

export default EditEventPage;
