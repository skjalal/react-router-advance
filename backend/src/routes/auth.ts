import { NextFunction, Request, Response, Router } from "express";
import { v4 as generateId } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NotAuthError } from "../util/error.js";
import { isValidEmail, isValidText } from "../util/validation.js";
import { addUser, get } from "./user.js";
import { User } from "../util/data-types.js";

const KEY = "supersecret";
const router = Router();

const createJSONToken = (email: string): string =>
  jwt.sign({ email }, KEY, { expiresIn: "1h" });

const validateJSONToken = (token: string): string | jwt.JwtPayload =>
  jwt.verify(token, KEY);

const isValidPassword = (
  password: string,
  storedPassword: string,
): Promise<boolean> => bcrypt.compare(password, storedPassword);

const checkAuth = (req: Request, _res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (!req.headers.authorization) {
    console.error("NOT AUTH. AUTH HEADER MISSING.");
    return next(new NotAuthError("Not authenticated."));
  }
  const authFragments = req.headers.authorization.split(" ");

  if (authFragments.length !== 2) {
    console.error("NOT AUTH. AUTH HEADER INVALID.");
    return next(new NotAuthError("Not authenticated."));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken) as string;
    req.headers["authorization"] = validatedToken;
  } catch (error) {
    console.error("NOT AUTH. TOKEN INVALID.", error);
    return next(new NotAuthError("Not authenticated."));
  }
  next();
};

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const data: User = req.body;
    const errors: { email?: string; password?: string } = {};

    if (isValidEmail(data.email)) {
      try {
        const existingUser = await get(data.email);
        if (existingUser) {
          errors.email = "Email exists already.";
        }
      } catch (error) {
        console.info("New user email detected", error);
      }
    } else {
      errors.email = "Invalid email.";
    }

    if (!isValidText(data.password!, 6)) {
      errors.password = "Invalid password. Must be at least 6 characters long.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: "User signup failed due to validation errors.",
        errors,
      });
    }

    try {
      const createdUser = await addUser(data);
      const authToken = createJSONToken(createdUser.email);
      res.status(201).json({
        message: "User created.",
        user: createdUser,
        token: authToken,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/login",
  async (req: Request, res: Response, _next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;

    let user: User;
    try {
      user = await get(email);
    } catch (error) {
      console.error("Failed to login", error);
      return res.status(401).json({ message: "Authentication failed." });
    }

    const pwIsValid = await isValidPassword(password, user.password!);
    if (!pwIsValid) {
      return res.status(422).json({
        message: "Invalid credentials.",
        errors: { credentials: "Invalid email or password entered." },
      });
    }

    const token = createJSONToken(email);
    res.json({ token });
  },
);

export { router, checkAuth };
