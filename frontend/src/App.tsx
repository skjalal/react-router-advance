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
import { eventLoader } from "./api/event-api.ts";

import "./App.css";

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
