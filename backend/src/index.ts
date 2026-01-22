import { NextFunction, Request, Response, Router } from "express";
import { config } from "./config/env.js";
import { buildApp } from "./lib/server.js";
import { errorHandler } from "./lib/error-handler.js";
import { healthHandler } from "./routes/health.js";
import { statusHandler } from "./routes/status.js";
import {
  loadEvents,
  getEvent,
  saveEvent,
  updateEvent,
  removeEvent,
} from "./routes/event.js";
import { Event, EventResponse } from "./util/data-types.js";
import { checkAuth, router as authRoutes } from "./routes/auth.js";
import { NotFoundError } from "./util/error.js";

const router = Router();
const app = buildApp();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { events } = await loadEvents();
    setTimeout(() => res.json({ events }), 1500);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const event = await getEvent(id);
    res.json({ event });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const event: Event = req.body;
  try {
    const { message, errors, code }: EventResponse = await saveEvent(event);
    if (errors) {
      return res.status(code).json({
        message,
        errors,
      });
    }
    setTimeout(() => {
      res.status(code).json({ message, event });
    }, 1500);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const event: Event = req.body;
  try {
    const { message, errors, code }: EventResponse = await updateEvent(
      id,
      event,
    );
    if (errors) {
      return res.status(code).json({
        message,
        errors,
      });
    }
    setTimeout(() => {
      res.status(code).json({ message, event });
    }, 1500);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { message, errors, code }: EventResponse = await removeEvent(id);
      if (errors) {
        return res.status(code).json({
          message,
          errors,
        });
      }
      return res.status(code).json({ message });
    } catch (error) {
      next(error);
    }
  },
);

app.use(authRoutes);

app.use("/events", router);
app.get("/healthz", healthHandler);
app.get("/api/v1/status", statusHandler);

app.use((error: unknown, _req: Request, res: Response) => {
  if (error instanceof NotFoundError) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong.";
    res.status(status).json({ message: message });
  } else {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.info(`Express server listening on port ${config.PORT}`);
});
