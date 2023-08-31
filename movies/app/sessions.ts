import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  userId: String;
};

type SessionFlashData = {
  error: String;
};

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      secrets: ["cook1e"],
    },
  });
