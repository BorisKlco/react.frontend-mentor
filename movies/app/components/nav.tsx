import { ReactNode } from "react";
import { RiMovie2Fill } from "react-icons/ri";
import { TiThSmall } from "react-icons/ti";
import { TbMovie } from "react-icons/tb";
import { PiTelevisionBold } from "react-icons/pi";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { Link, useSearchParams } from "@remix-run/react";

export default function Navbar({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  return (
    <div className="flex h-full bg-slate-950 overflow-auto">
      <div className="flex flex-col w-full xl:flex-row">
        <nav className="flex xl:flex-col mx-4 md:mx-8 px-4 md:px-6 py-4 my-4 xl:my-8 rounded-2xl justify-between xl:justify-start bg-slate-900 xl:gap-8">
          <p className="text-red-800">
            <RiMovie2Fill className="h-[54px] w-full xl:mb-6" />
          </p>
          <div className="flex xl:flex-col xl:gap-6 gap-3 items-center text-white h-full xl:h-auto ">
            <Link to="/">
              <TiThSmall
                className={`h-full w-[32px] hover:text-green-400 transition hover:scale-125 ${
                  !searchParams[0].get("type") && "text-green-400"
                }`}
              />
            </Link>
            <Link to="/?type=movie">
              <TbMovie
                className={`h-full w-[32px] hover:text-red-600 transition hover:scale-125 ${
                  searchParams[0].get("type") == "movie" && "text-red-600"
                }`}
              />
            </Link>
            <Link to="/?type=tv">
              <PiTelevisionBold
                className={`h-full w-[32px] hover:text-pink-600 transition hover:scale-125 ${
                  searchParams[0].get("type") == "tv" && "text-pink-600"
                }`}
              />
            </Link>
            <BsFillBookmarkHeartFill className="h-full w-[32px] hover:text-sky-600 transition hover:scale-125" />
          </div>
          <div className="group my-auto xl:mt-auto xl:mb-0 rounded-full aspect-square w-[48px] overflow-hidden outline hover:outline-white">
            <img
              src="https://robohash.org/SCJ.png?set=set4"
              alt="profile"
              className="m-auto object-center  transition grayscale-[50%] group-hover:grayscale-0"
            />
          </div>
        </nav>
        <main className="h-screen py-6 overflow-auto my-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
