type Event = {
  id: string;
  title: string;
  image: string;
  description: string;
  date: string;
};

type EventsListProps = {
  events: Event[];
};

type EventItemProps = {
  event: Event;
};

type EventFormProps = {
  method: string;
  event: Event;
};

type EventRouteParam = { eventId: string };

export type {
  Event,
  EventsListProps,
  EventItemProps,
  EventFormProps,
  EventRouteParam,
};
