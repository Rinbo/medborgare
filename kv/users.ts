import { monotonicFactory } from "https://deno.land/x/ulid@v0.3.0/mod.ts";
import { createSha256Hash } from "crypto-utils";
import { Optional } from "../utils/optional.ts";

const ulid = monotonicFactory();
const kv = await Deno.openKv();

type DbUser = { id: string; name: string; email: string; password_hash: string; createdAt: string; updatedAt: string };
type NewUser = Omit<DbUser, "id" | "password_hash" | "createdAt" | "updatedAt"> & { password: string };

export type User = Omit<DbUser, "password_hash">;

const USERS = "users";
const USERS_BY_EMAIL = "users_by_email";

export async function insertNewUser(newUser: NewUser): Promise<boolean> {
  const userExistsOption = await findUser(newUser.email.toLowerCase().trim());

  if (userExistsOption.isPresent()) {
    console.warn("user already exists", newUser);
    return false;
  }

  return await insertUser(await createUser(newUser));
}

export async function findUser(email: string): Promise<Optional<User>> {
  const dbUserOption = await findDbUser(email);
  if (dbUserOption.isEmpty()) return Optional.empty();
  return Optional.of(scrubDbUser(dbUserOption.get()));
}

export async function findAllUsers() {
  const entries = kv.list<User>({ prefix: [USERS] });
  const users: User[] = [];

  for await (const entry of entries) {
    users.push(entry.value);
  }

  return users;
}

export async function validatePasswordAndGetUser({ email, password }: { email: string; password: string }): Promise<Optional<User>> {
  const dbUserOption = await findDbUser(email.toLowerCase().trim());
  if (dbUserOption.isEmpty()) return Optional.empty();
  const dbUser = dbUserOption.get();
  const isPasswordCorrect = (await createSha256Hash(password.trim())) === dbUser.password_hash;
  if (!isPasswordCorrect) return Optional.empty();
  return Optional.of(scrubDbUser(dbUser));
}

async function findDbUser(email: string): Promise<Optional<DbUser>> {
  const dbUser = (await kv.get<DbUser>([USERS_BY_EMAIL, email])).value;
  return Optional.ofNullable(dbUser);
}

async function insertUser(user: DbUser): Promise<boolean> {
  const result = await kv.atomic()
    .check()
    .set([USERS, user.id], user)
    .set([USERS_BY_EMAIL, user.email], user)
    .commit();

  return result.ok;
}

async function createUser({ name, email, password }: NewUser) {
  const now = new Date().toUTCString();

  return {
    id: ulid(),
    name,
    email: email.toLowerCase().trim(),
    password_hash: await createSha256Hash(password.trim()),
    createdAt: now,
    updatedAt: now,
  };
}

function scrubDbUser(dbUser: DbUser): User {
  const { password_hash: _ignored, ...user } = dbUser;
  return user;
}
