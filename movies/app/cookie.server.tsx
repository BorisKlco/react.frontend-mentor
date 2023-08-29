import { createCookie } from "@remix-run/node";

export const userCookie = createCookie("user-Cookie", {
  maxAge: 604_800,
});
