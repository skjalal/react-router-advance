import React, { type JSX } from "react";
import { useParams, Link } from "react-router-dom";
import type { EventRouteParam } from "../utils/data-types";

const EventDetailPage: React.FC = (): JSX.Element => {
  const { eventId } = useParams<EventRouteParam>();
  return (
    <>
      <h1>Event Details Page</h1>
      <p>{eventId}</p>
      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
};

export default EventDetailPage;
