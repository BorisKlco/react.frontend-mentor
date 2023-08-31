import { type V2_MetaFunction, type LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import MovieItem from "~/components/movieDetail";
import TvItem from "~/components/tvDetail";

export async function loader({ request, params }: LoaderArgs) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  if (type != "movie" && type != "tv") {
    return null;
  }
  const req = await fetch(
    `https://api.themoviedb.org/3/${type}/${params.id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmIxMjczZjIwMTA0ZGMyNGJmZDZkZGRkYTMwMjI5MCIsInN1YiI6IjY0ZWI4NzI4YzNjODkxMDEzYWIyZjQ2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PDdWxlFxacH9WkJJtp7BJwXZJRl7LTrrY8eBGBU0lsM",
      },
    }
  );

  if (!req.ok) {
    return null;
  }

  return json(await req.json());
}

export async function action() {
  console.log("we hit action from book item");
  return null;
}

interface MetaDataType {
  data: {
    original_title?: string;
    name?: string;
  };
}

export const meta: V2_MetaFunction = ({ data }: MetaDataType) => {
  let title = "Generic Title";
  try {
    if (data.original_title) {
      title = data.original_title;
    } else if (data.name) {
      title = data.name;
    }
  } catch (error) {
    title = "Sorry, something wrong!";
  }

  return [
    { title: title },
    { name: "description", content: "Movies/TV gallery" },
  ];
};

export default function Details() {
  const data = useLoaderData();

  if (!data) {
    return (
      <>
        <div className="grid place-content-center h-full">
          <h1 className="font-bold text-3xl text-white">
            <Link to={`/`}>Error while loading. Try again...</Link>
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      {data.original_name ? <TvItem item={data} /> : <MovieItem item={data} />}
    </>
  );
}
