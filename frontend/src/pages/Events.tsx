import React, { type JSX } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

import EventsList from "../components/EventsList";
import type { Data } from "../utils/data-types";

const EventsPage: React.FC = (): JSX.Element => {
  const navigation = useNavigation();
  const isLoading: boolean = navigation.state === "loading";
  const { events } = useLoaderData<Data>();
  let element: JSX.Element;
  if (isLoading) {
    element = <p className="loader">Loading...</p>;
  } else {
    element = <EventsList events={events} />;
  }
  return element;
};

export default EventsPage;
