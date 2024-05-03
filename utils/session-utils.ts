import { getCookies } from "$std/http/cookie.ts";
import { deleteSession, findSession, insertSession, type Session } from "kv/sessions.ts";
import type { CookieOptions } from "./cookie-utils.ts";
import { serializeCookie } from "./cookie-utils.ts";
import { COOKIE_MAX_AGE } from "constants";
import { Optional } from "./optional.ts";
import { SessionState } from "./types.ts";

const COOKIE_SESSION_NAME = "session";

// TODO evaluate encrypting session
export function commitSession(session: Session): string {
  return serializeCookie(COOKIE_SESSION_NAME, createCookieOptions(JSON.stringify(convertToSessionState(session)), COOKIE_MAX_AGE));
}

export async function destroySession(req: Request): Promise<string> {
  const sessionOption = await getSession(req);
  sessionOption.isPresent() && await deleteSession(sessionOption.get());

  return serializeCookie(COOKIE_SESSION_NAME, createCookieOptions("", 0));
}

export async function createSession(email: string, name: string, userAgent: string): Promise<Session> {
  const session = { id: crypto.randomUUID(), email, name, createdAt: new Date().toUTCString(), userAgent } satisfies Session;
  if (await insertSession(session)) return session;
  throw new Error("Saving of session failed for " + email);
}

export async function getSession(req: Request): Promise<Optional<Session>> {
  const sessionStateOption = getCookieSession(req);
  if (sessionStateOption.isEmpty()) return Optional.empty();
  return await findSession(sessionStateOption.get().sessionId);
}

export function getCookieSession(req: Request): Optional<SessionState> {
  const cookies = getCookies(req.headers);
  const session = JSON.parse(cookies[COOKIE_SESSION_NAME]) as SessionState;
  return Optional.ofNullable(session);
}

function convertToSessionState({ id, name, email }: Session): SessionState {
  return { sessionId: id, name, email };
}

function createCookieOptions(value: string, maxAge: number): CookieOptions {
  return {
    value,
    maxAge,
    httpOnly: true,
    sameSite: "Strict",
    secure: Deno.env.get("DENO_ENV") !== "local",
  };
}