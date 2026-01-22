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
import AuthenticationPage from "./pages/Authentication.tsx";
import NewsletterPage from "./pages/Newsletter.tsx";
import {
  eventLoader,
  eventLoaderById,
  saveOrEditEventAction,
  removeEventById,
  newsletterAction,
  authAction,
  logoutAction,
  tokenLoader,
  checkAuthLoader,
} from "./api/event-api.ts";

import "./App.css";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          { index: true, element: <EventsPage />, loader: eventLoader },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventLoaderById,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: removeEventById,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: saveOrEditEventAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: saveOrEditEventAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: "logout",
        action: logoutAction,
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
