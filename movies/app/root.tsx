import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { RiMovie2Fill } from "react-icons/ri";
import { TiThSmall } from "react-icons/ti";
import { TbMovie } from "react-icons/tb";
import { PiTelevisionBold } from "react-icons/pi";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { IoIosLogIn } from "react-icons/io";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";

import { db } from "~/utils/db.server";
import { userCookie } from "~/cookie.server";

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
  const cookie = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-full bg-slate-950 overflow-auto">
          <div className="flex flex-col w-full xl:flex-row">
            <nav className="flex xl:flex-col mx-4 md:mx-8 px-4 md:px-6 py-4 my-4 xl:my-8 rounded-2xl justify-between xl:justify-start bg-slate-900 xl:gap-8">
              <p className="text-red-800">
                <RiMovie2Fill className="h-[54px] w-full xl:mb-6" />
              </p>
              <div className="flex xl:flex-col xl:gap-6 gap-3 items-center text-white h-full xl:h-auto ">
                <NavLink to="/">
                  {({ isActive }) => (
                    <TiThSmall
                      className={`h-full w-[32px] hover:text-green-400 transition hover:scale-125 ${
                        isActive ? "text-green-400" : ""
                      }`}
                    />
                  )}
                </NavLink>
                <NavLink to="/movies">
                  {({ isActive }) => (
                    <TbMovie
                      className={`h-full w-[32px] hover:text-red-600 transition hover:scale-125 ${
                        isActive ? "text-red-600" : ""
                      }`}
                    />
                  )}
                </NavLink>
                <NavLink to="/tv">
                  {({ isActive }) => (
                    <PiTelevisionBold
                      className={`h-full w-[32px] hover:text-pink-600 transition hover:scale-125 ${
                        isActive ? "text-pink-600" : ""
                      }`}
                    />
                  )}
                </NavLink>
                <BsFillBookmarkHeartFill className="h-full w-[32px] hover:text-sky-600 transition hover:scale-125" />
              </div>
              {cookie ? (
                <div className="group my-auto xl:mt-auto xl:mb-0 rounded-full aspect-square w-[48px] overflow-hidden outline hover:outline-white">
                  <img
                    src="/SCJ.webp"
                    alt="profile"
                    className="m-auto object-center  transition grayscale-[50%] group-hover:grayscale-0"
                  />
                </div>
              ) : (
                <Link to="/login" className="xl:mt-auto xl:mb-0">
                  <IoIosLogIn className="text-white w-full h-full" />
                </Link>
              )}
            </nav>
            <main className="h-screen py-6 overflow-auto my-auto w-full">
              <Outlet />
            </main>
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
