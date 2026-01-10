import React, { type JSX } from "react";
import EventForm from "../components/EventForm";

const NewEventPage: React.FC = (): JSX.Element => {
  return <EventForm method="post" />;
};

export default NewEventPage;
