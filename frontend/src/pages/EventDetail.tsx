import React, { type JSX } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import type { EventItemProps } from "../utils/data-types";
import EventItem from "../components/EventItem";

const EventDetailPage: React.FC = (): JSX.Element => {
  const data = useRouteLoaderData<EventItemProps>("event-detail");
  return (
    <>
      <EventItem event={data?.event} />
      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
};

export default EventDetailPage;
