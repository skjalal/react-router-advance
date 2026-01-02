import React, { type JSX } from "react";
import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";
import type { Event } from "../utils/data-types";

const EventsPage: React.FC = (): JSX.Element => {
  const events = useLoaderData<Event[]>();

  return <EventsList events={events} />;
};

export default EventsPage;
