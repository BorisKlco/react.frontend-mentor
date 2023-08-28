import { LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { GenreColors, Genres } from "~/helpers";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Entertainment web app" },
    { name: "description", content: "Movies gallery" },
  ];
};

interface MovieType {
  id: number;
  title: string;
  name?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export async function loader({}: LoaderArgs) {
  const url = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmIxMjczZjIwMTA0ZGMyNGJmZDZkZGRkYTMwMjI5MCIsInN1YiI6IjY0ZWI4NzI4YzNjODkxMDEzYWIyZjQ2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PDdWxlFxacH9WkJJtp7BJwXZJRl7LTrrY8eBGBU0lsM",
      },
    }
  );

  return json(await url.json());
}

export default function Index() {
  const data = useLoaderData();
  const genreID = Genres;
  const colors = GenreColors;
  console.log(data.results);
  return (
    <>
      <div className="flex flex-wrap gap-8 justify-center">
        {data.results.map((movie: MovieType) => (
          <div
            key={movie.id}
            className="group relative overflow-hidden rounded-md"
          >
            <div className="group/fav absolute right-3 top-3 rounded-full h-12 aspect-square bg-black/40 z-10 grid place-content-center">
              <BsFillBookmarkHeartFill className="h-5 w-auto text-white transition group-hover/fav:text-sky-600 group-hover/fav:rotate-6" />
            </div>
            <div className="group/info absolute bottom-0 w-full bg-black/40 z-10 grid place-content-start p-2 transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur">
              <h1 className="text-white text-xl font-semibold">
                {movie.title ?? movie.name}
              </h1>
              <div className="my-2 flex flex-wrap gap-2">
                {movie.genre_ids.map((genre) => (
                  <span
                    style={{
                      backgroundColor:
                        colors[Math.floor(Math.random() * colors.length)],
                    }}
                    className="py-[2px] px-[6px] rounded-md text-sm font-semibold "
                    key={genre}
                  >
                    <p className="text-white drop-shadow-[0px_0px_1px_rgba(0,0,0)]">
                      {genreID.map((item: any) => {
                        if (item.id == genre) {
                          return item.name;
                        }
                        return null;
                      })}
                    </p>
                  </span>
                ))}
              </div>
              <p className="text-white line-clamp-3 my-2">{movie.overview}</p>
            </div>
            <img
              className="max-[400px]:h-48 max-[929px]:h-64 min-[930px]:h-[26rem] object-cover transition group-hover:scale-[1.02] contrast-[0.95] group-hover:contrast-[1.02] z-1"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt=""
            />
          </div>
        ))}
      </div>
    </>
  );
}
