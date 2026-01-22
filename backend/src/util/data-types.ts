type Event = {
  id?: string;
  title: string;
  date: string;
  image: string;
  description: string;
};

type User = {
  id: string;
  email: string;
  password?: string;
};

type Data = {
  events: Event[];
  users: User[];
};

type EventResponse = {
  message: string;
  event?: Event;
  user?: User;
  code: number;
  errors?: EventErrorResponse;
};

type EventErrorResponse = {
  title?: string;
  date?: string;
  image?: string;
  description?: string;
};

export type { Event, User, Data, EventResponse, EventErrorResponse };
