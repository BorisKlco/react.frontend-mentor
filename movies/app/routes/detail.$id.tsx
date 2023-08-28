import { V2_MetaFunction, LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { MovieItemProp, TvItemProp } from "~/helpers";

export async function loader({ request, params }: LoaderArgs) {
  console.log("det", request, "params:", params);
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
  const data: MovieItemProp | TvItemProp = useLoaderData();
  console.log(data);

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
      <div className="w-full px-4 xl:py-2 h-full mx-auto ">
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data.backdrop_path})`,
          }}
          className={`bg-cover bg-center bg-no-repeat h-full w-full rounded-2xl overflow-hidden`}
        >
          <div className="w-full h-full backdrop-blur-sm backdrop-brightness-75 backdrop-grayscale-[.5]">
            <h1 className="text-white text-4xl">123</h1>
          </div>
        </div>
      </div>
    </>
  );
}
