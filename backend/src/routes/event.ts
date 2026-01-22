import { promises as fs } from "node:fs";
import { v4 as generateId } from "uuid";
import path from "node:path";
import type {
  Event,
  Data,
  EventResponse,
  EventErrorResponse,
} from "../util/data-types.js";
import { NotFoundError } from "../util/error.js";
import {
  isValidText,
  isValidDate,
  isValidImageUrl,
} from "../util/validation.js";

const DATA_FILE = "events.json";

export async function loadEvents(): Promise<Data> {
  try {
    const filePath = path.join(process.cwd(), "src", "data", DATA_FILE);
    const raw = await fs.readFile(filePath, "utf-8");
    const json: Data = JSON.parse(raw);
    return json;
  } catch (err: unknown) {
    console.error(err);
    throw new NotFoundError("Could not find any events.");
  }
}

export async function getEvent(id: string): Promise<Event> {
  const storedData: Data = await loadEvents();
  const events: Event[] = storedData.events;
  if (events.length === 0) {
    throw new NotFoundError("Could not find any events.");
  }
  const event: Event | undefined = events.find((event) => event.id === id);
  if (!event) {
    throw new NotFoundError("Could not find event for id " + id);
  }

  return event;
}

export async function saveEvent(event: Event): Promise<EventResponse> {
  const { title, description, image, date } = event;
  const errors: EventErrorResponse = {};
  if (!isValidText(title)) {
    errors.title = "Invalid title.";
  }

  if (!isValidText(description)) {
    errors.description = "Invalid description.";
  }

  if (!isValidDate(date)) {
    errors.date = "Invalid date.";
  }

  if (!isValidImageUrl(image)) {
    errors.image = "Invalid image.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: "Adding the event failed due to validation errors.",
      errors,
      code: 422,
    };
  }
  const storedData: Data = await loadEvents();
  const events: Event[] = storedData.events;
  if (events.length === 0) {
    throw new NotFoundError("Could not find any events.");
  }

  events.unshift({ ...event, id: generateId() });
  const filePath = path.join(process.cwd(), "src", "data", DATA_FILE);
  await fs.writeFile(
    filePath,
    JSON.stringify({ ...storedData, events }, null, 2),
  );
  return { message: "Event saved.", event, code: 201 };
}

export async function updateEvent(
  id: string,
  event: Event,
): Promise<EventResponse> {
  const { title, description, image, date } = event;
  const errors: EventErrorResponse = {};
  if (!isValidText(title)) {
    errors.title = "Invalid title.";
  }

  if (!isValidText(description)) {
    errors.description = "Invalid description.";
  }

  if (!isValidDate(date)) {
    errors.date = "Invalid date.";
  }

  if (!isValidImageUrl(image)) {
    errors.image = "Invalid image.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: "Updating the event failed due to validation errors.",
      errors,
      code: 422,
    };
  }
  const storedData: Data = await loadEvents();
  const events: Event[] = storedData.events;
  if (events.length === 0) {
    throw new NotFoundError("Could not find any events.");
  }
  const index: number = events.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError("Could not find event for id " + id);
  }
  events[index] = { ...event, id };
  const filePath = path.join(process.cwd(), "src", "data", DATA_FILE);
  await fs.writeFile(
    filePath,
    JSON.stringify({ ...storedData, events }, null, 2),
  );
  return { message: "Event updated.", event, code: 200 };
}

export async function removeEvent(id: string): Promise<EventResponse> {
  const storedData: Data = await loadEvents();
  const events: Event[] = storedData.events;
  if (events.length === 0) {
    throw new NotFoundError("Could not find any events.");
  }
  const updatedData: Event[] | undefined = events.filter((ev) => ev.id !== id);
  const filePath = path.join(process.cwd(), "src", "data", DATA_FILE);
  await fs.writeFile(
    filePath,
    JSON.stringify({ ...storedData, events: updatedData }, null, 2),
  );
  return { message: "Event updated.", code: 200 };
}
