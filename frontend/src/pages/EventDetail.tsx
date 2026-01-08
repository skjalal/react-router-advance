import React, { type JSX } from "react";
import { Link, useLoaderData } from "react-router-dom";
import type { EventItemProps } from "../utils/data-types";
import EventItem from "../components/EventItem";

const EventDetailPage: React.FC = (): JSX.Element => {
  const { event } = useLoaderData<EventItemProps>();
  return (
    <>
      <EventItem event={event} />
      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
};

export default EventDetailPage;
