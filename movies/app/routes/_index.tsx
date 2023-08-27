import { LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Entertainment web app" },
    { name: "description", content: "Movies gallery" },
  ];
};

interface MovieType {
  id: number;
  title: string;
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
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
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
  console.log(data);
  return (
    <>
      <div className="flex flex-wrap gap-8 justify-center">
        {data.results.map((movie: MovieType) => (
          <div
            key={movie.id}
            className="group relative block overflow-hidden rounded-md"
          >
            <div className="group/fav absolute right-5 top-5 rounded-full h-16 aspect-square bg-black/40 z-10 grid place-content-center">
              <BsFillBookmarkHeartFill className="h-8 w-auto text-white transition group-hover/fav:text-sky-600 group-hover/fav:rotate-6" />
            </div>
            <img
              className="h-128 object-cover transition group-hover:scale-[1.02] contrast-[0.95] group-hover:contrast-[1.02]"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt=""
            />
          </div>
        ))}
      </div>
    </>
  );
}
