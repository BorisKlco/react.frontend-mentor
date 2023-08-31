import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Item from "~/components/item";
import type { ItemType } from "~/helpers";

export const meta: V2_MetaFunction = () => {
  let locationTitle = "Movie/TV gallery";
  return [
    { title: locationTitle },
    { name: "description", content: "Movies/TV gallery" },
  ];
};

export async function loader() {
  const req = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?language=en-US`,
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

export default function Index() {
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
      <div className="flex flex-wrap gap-8 justify-center">
        {data.results.map((item: ItemType) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
