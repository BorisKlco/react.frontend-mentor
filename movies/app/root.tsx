import type { LinksFunction } from "@remix-run/node";
import { RiMovie2Fill } from "react-icons/ri";
import { TiThSmall } from "react-icons/ti";
import { TbMovie } from "react-icons/tb";
import { PiTelevisionBold } from "react-icons/pi";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-full bg-slate-950">
          <div className="flex flex-col w-full xl:flex-row">
            <nav className="flex xl:flex-col mx-8 px-6 py-4 my-8 rounded-2xl justify-between xl:justify-start bg-slate-900 xl:gap-8">
              <p className="text-red-800 rotate-[345deg]">
                <RiMovie2Fill className="h-[54px] w-full " />
              </p>
              <div className="flex xl:flex-col xl:gap-6 gap-2 items-center text-white h-full xl:h-auto ">
                <TiThSmall className="h-full w-[32px]" />
                <TbMovie className="h-full w-[32px]" />
                <PiTelevisionBold className="h-full w-[32px]" />
                <BsFillBookmarkHeartFill className="h-full w-[32px]" />
              </div>
              <div className="my-auto xl:mt-auto xl:mb-0 rounded-full aspect-square w-[48px] overflow-hidden outline outline-slate-950">
                <img
                  src="https://robohash.org/SCJ.png?set=set4"
                  alt="profile"
                  className="m-auto object-center bg-white"
                />
              </div>
            </nav>
            <main className="text-white">
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
