import React, { type JSX } from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";
import type { EventItemProps } from "../utils/data-types";

const EditEventPage: React.FC = (): JSX.Element => {
  const data = useRouteLoaderData<EventItemProps>("event-detail");
  return <EventForm method="get" event={data?.event} />;
};

export default EditEventPage;
