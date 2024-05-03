export interface CookieOptions {
  value: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

export function serializeCookie(name: string, options: CookieOptions): string {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(options.value)}`;

  if (options.expires) {
    cookieString += `; Expires=${options.expires.toUTCString()}`;
  }

  if (Number.isInteger(options.maxAge)) {
    cookieString += `; Max-Age=${options.maxAge}`;
  }

  if (options.domain) {
    cookieString += `; Domain=${options.domain}`;
  }

  if (options.path) {
    cookieString += `; Path=${options.path}`;
  } else {
    cookieString += "; Path=/";
  }

  if (options.secure) {
    cookieString += `; Secure`;
  }

  if (options.httpOnly) {
    cookieString += `; HttpOnly`;
  }

  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  }

  return cookieString;
}
