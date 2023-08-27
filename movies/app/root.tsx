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
            <nav className="flex xl:flex-col mx-4 md:mx-8 px-4 md:px-6 py-4 my-8 rounded-2xl justify-between xl:justify-start bg-slate-900 xl:gap-8">
              <p className="text-red-800 rotate-[345deg]">
                <RiMovie2Fill className="h-[54px] w-full " />
              </p>
              <div className="flex xl:flex-col xl:gap-6 gap-3 items-center text-white h-full xl:h-auto ">
                <TiThSmall className="h-full w-[32px] hover:text-green-400 transition hover:scale-125" />
                <TbMovie className="h-full w-[32px] hover:text-red-600 transition hover:scale-125" />
                <PiTelevisionBold className="h-full w-[32px] hover:text-pink-600 transition hover:scale-125" />
                <BsFillBookmarkHeartFill className="h-full w-[32px] hover:text-sky-600 transition hover:scale-125" />
              </div>
              <div className="group my-auto xl:mt-auto xl:mb-0 rounded-full aspect-square w-[48px] overflow-hidden outline hover:outline-white">
                <img
                  src="https://robohash.org/SCJ.png?set=set4"
                  alt="profile"
                  className="m-auto object-center bg-white transition grayscale-[50%] group-hover:grayscale-0"
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
