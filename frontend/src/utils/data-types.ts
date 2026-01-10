import type { HTMLFormMethod } from "react-router-dom";

type Event = {
  id: string;
  title: string;
  image: string;
  description: string;
  date: string;
};

type Data = {
  events: Event[];
};

type EventsListProps = {
  events: Event[];
};

type EventItemProps = {
  event?: Event;
};

type EventFormProps = {
  method: HTMLFormMethod;
  event?: Event;
};

type EventRouteParam = { eventId: string };

type PageContentProps = {
  title: string;
};

type ErrorResponse = {
  message: string;
  errors?: Event;
};

export type {
  Event,
  EventsListProps,
  EventItemProps,
  EventFormProps,
  EventRouteParam,
  Data,
  PageContentProps,
  ErrorResponse,
};
