import {
  createBrowserRouter,
  RouterProvider,
  type DataRouter,
  type RouteObject,
} from "react-router-dom";

import HomePage from "./pages/Home.tsx";
import RootLayout from "./pages/Root.tsx";
import ErrorPage from "./pages/Error.tsx";
import EventsPage from "./pages/Events.tsx";
import EventDetailPage from "./pages/EventDetail.tsx";
import NewEventPage from "./pages/NewEvent.tsx";
import EditEventPage from "./pages/EditEvent.tsx";
import EventsRootLayout from "./pages/EventsRoot.tsx";

import "./App.css";
import type { Data, Event } from "./utils/data-types.ts";

const eventLoader = async (): Promise<Event[]> => {
  const response = await fetch("http://localhost:3000/events");

  if (response.ok) {
    const resData: Data = await response.json();
    return resData.events;
  } else {
    console.error("Fetching events failed.");
  }
  return [];
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          { index: true, element: <EventsPage />, loader: eventLoader },
          { path: ":eventId", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":eventId/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
];
const router: DataRouter = createBrowserRouter(routes);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
