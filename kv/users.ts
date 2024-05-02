import { monotonicFactory } from "https://deno.land/x/ulid@v0.3.0/mod.ts";
import { createSha256Hash } from "crypto-utils";

const ulid = monotonicFactory();
const kv = await Deno.openKv();

type DbUser = { id: string; name: string; email: string; password_hash: string; createdAt: string; updatedAt: string };
type NewUser = Omit<DbUser, "id" | "password_hash" | "createdAt" | "updatedAt"> & { password: string };

export type User = Omit<DbUser, "password_hash">;

const USERS = "users";
const USERS_BY_EMAIL = "users_by_email";

export async function insertNewUser(newUser: NewUser): Promise<User> {
  return scrubDbUser(await insertUser(await createUser(newUser)));
}

export async function findUser(email: string): Promise<User> {
  return scrubDbUser(await findDbUser(email));
}

export async function isValidPassword({ email, password }: { email: string; password: string }): Promise<boolean> {
  const dbUser = await findDbUser(email);
  return (await createSha256Hash(password)) === dbUser.password_hash;
}

async function findDbUser(email: string): Promise<DbUser> {
  const dbUser = (await kv.get<DbUser>([USERS_BY_EMAIL, email])).value;
  if (!dbUser) throw new Error("User not found: " + email);
  return dbUser;
}

async function insertUser(user: DbUser): Promise<DbUser> {
  const result = await kv.atomic()
    .set([USERS, user.id], user)
    .set([USERS_BY_EMAIL, user.email], user)
    .commit();

  if (!result.ok) throw new Error("Insertion of user failed");

  return user;
}

async function createUser({ name, email, password }: NewUser) {
  const now = new Date().toUTCString();

  return {
    id: ulid(),
    name,
    email,
    password_hash: await createSha256Hash(password),
    createdAt: now,
    updatedAt: now,
  };
}

function scrubDbUser(dbUser: DbUser): User {
  const { password_hash: _ignored, ...user } = dbUser;
  return user;
}
