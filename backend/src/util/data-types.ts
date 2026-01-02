type Event = {
  id?: string;
  title: string;
  date: string;
  image: string;
  description: string;
};

type Data = {
  events: Event[];
};

type EventResponse = {
  message: string;
  event?: Event;
  code: number;
  errors?: EventErrorResponse;
};

type EventErrorResponse = {
  title?: string;
  date?: string;
  image?: string;
  description?: string;
};

export type { Event, Data, EventResponse, EventErrorResponse };
