import { COOKIE_MAX_AGE } from "constants";
import { Optional } from "../utils/optional.ts";

const kv = await Deno.openKv();

export type Session = { id: string; email: string; name: string; userId: string; createdAt: string; userAgent: string };
type SessionIdentifier = Omit<Session, "createdAt" | "name" | "userAgent">;

const SESSIONS = "sessions";
const SESSIONS_BY_EMAIL_ID = "sessions_by_email_id";

const expireIn = COOKIE_MAX_AGE * 1000;

export async function findSession(id: string): Promise<Optional<Session>> {
  const result = await kv.get<Session>([SESSIONS, id]);
  return Optional.ofNullable(result.value);
}

export async function findSessionsByEmail(email: string): Promise<Session[]> {
  const entries = kv.list<Session>({ prefix: [SESSIONS_BY_EMAIL_ID, email] });
  const sessions: Session[] = [];

  for await (const entry of entries) {
    sessions.push(entry.value);
  }

  return sessions;
}

export async function deleteAllSessionsByEmail(email: string): Promise<boolean> {
  const sessions = await findSessionsByEmail(email);
  const result = sessions.map(async (sessions) => await deleteSession(sessions));
  return result.every((res) => res);
}

export async function deleteSession({ id, email }: SessionIdentifier): Promise<boolean> {
  const result = await kv.atomic()
    .delete([SESSIONS, id])
    .delete([SESSIONS_BY_EMAIL_ID, email, id])
    .commit();

  return result.ok;
}

export async function insertSession(session: Session): Promise<boolean> {
  const { id, email } = session;

  const result = await kv.atomic()
    .set([SESSIONS, id], session, { expireIn })
    .set([SESSIONS_BY_EMAIL_ID, email, id], session, { expireIn })
    .commit();

  return result.ok;
}
