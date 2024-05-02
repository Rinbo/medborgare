export function getSearchParams(
  req: Request,
  name: string,
): string | null {
  const url = new URL(req.url);
  return url.searchParams.get(name);
}

export function json(body: object, status: number, optionalHeaders?: object) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...optionalHeaders,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export function redirect(path: string, optionalHeaders?: object): Response {
  return new Response(null, {
    status: 303,
    headers: { ...optionalHeaders, Location: path },
  });
}
