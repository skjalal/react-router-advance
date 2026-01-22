import { promises as fs } from "node:fs";
import { v4 as generateId } from "uuid";
import bcrypt from "bcryptjs";
import path from "node:path";
import type { User, Data } from "../util/data-types.js";
import { NotFoundError } from "../util/error.js";

const DATA_FILE = "events.json";

export async function loadData(): Promise<Data> {
  try {
    const filePath = path.join(process.cwd(), "src", "data", DATA_FILE);
    const raw = await fs.readFile(filePath, "utf-8");
    const json: Data = JSON.parse(raw);
    return json;
  } catch (err: unknown) {
    console.error(err);
    throw new NotFoundError("Could not find any data.");
  }
}

export async function get(email: string): Promise<User> {
  const storedData: Data = await loadData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Could not find any users.");
  }
  const user: User | undefined = storedData.users.find(
    (ev) => ev.email === email,
  );
  if (!user) {
    throw new NotFoundError("Could not find user for email " + email);
  }

  return user;
}

export async function addUser(user: User): Promise<User> {
  const { email, password } = user;
  const storedData: Data = await loadData();
  if (!storedData.users) {
    storedData.users = [];
  }
  const userId = generateId();
  const hashedPw = await bcrypt.hash(password!, 12)!;

  storedData.users.push({ ...user, password: hashedPw, id: userId });
  const filePath = path.join(process.cwd(), "src", "data", DATA_FILE);
  await fs.writeFile(
    filePath,
    JSON.stringify({ ...storedData, users: storedData.users }, null, 2),
  );
  return { id: userId, email };
}
