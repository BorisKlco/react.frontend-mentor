import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Item from "~/components/item";
import type { ItemType } from "~/helpers";
import { db } from "~/utils/db.server";
import { getSession } from "~/sessions";

export const meta: V2_MetaFunction = () => {
  let locationTitle = "TV gallery";
  return [
    { title: locationTitle },
    { name: "description", content: "Movies/TV gallery" },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let favorites;
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

  if (session.has("userId")) {
    favorites = await db.favorite.findMany({
      where: {
        name: session.get("userId") as string,
      },
      select: {
        itemId: true,
      },
    });
  } else {
    favorites = [{}];
  }

  const resp = await req.json();

  return json({ favorites: favorites, items: resp });
}

export default function Index() {
  const { favorites, items } = useLoaderData();

  return (
    <>
      <div className="flex flex-wrap gap-8 justify-center">
        {items.results.map((item: ItemType) => {
          if (
            favorites.some(
              (favorite: { itemId: number }) => favorite.itemId === item.id
            )
          ) {
            return <Item key={item.id} item={item} bookmark={true} />;
          } else {
            return <Item key={item.id} item={item} bookmark={false} />;
          }
        })}
      </div>
    </>
  );
}
