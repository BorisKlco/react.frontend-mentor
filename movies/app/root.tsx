import type { LinksFunction } from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import Navbar from "./components/nav";

import { db } from "~/utils/db.server";
import { userCookie } from "~/cookie.server";
import { LoaderArgs } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({ request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userCookie.parse(cookieHeader)) || {};

  if (cookie.login) {
    try {
      await db.user.findFirstOrThrow({
        where: {
          cookie: cookie.login,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
}

export default function App() {
  const loader = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar cookie={loader}>
          <Outlet />
        </Navbar>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
