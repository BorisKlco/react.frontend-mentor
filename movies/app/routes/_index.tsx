import { LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Item from "~/components/item";
import { ItemType } from "~/helpers";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Entertainment web app" },
    { name: "description", content: "Movies gallery" },
  ];
};

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
