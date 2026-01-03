import React, { type JSX } from "react";
import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";
import type { Data } from "../utils/data-types";

const EventsPage: React.FC = (): JSX.Element => {
  const { events } = useLoaderData<Data>();
  return <EventsList events={events} />;
};

export default EventsPage;
