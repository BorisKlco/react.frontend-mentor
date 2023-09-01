import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Item from "~/components/item";
import type { ItemType } from "~/helpers";
import { db } from "~/utils/db.server";
import { getSession } from "~/sessions";

interface Favorite {
  type: string;
  itemId: number; // Assuming itemId is a number, you can change the type accordingly
}

export const meta: V2_MetaFunction = () => {
  let locationTitle = "Bookmarks";
  return [
    { title: locationTitle },
    { name: "description", content: "Movies/TV gallery" },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let favorites: Favorite[];
  let items = [];

  if (session.has("userId")) {
    favorites = await db.favorite.findMany({
      where: {
        name: session.get("userId") as string,
      },
      select: {
        itemId: true,
        type: true,
      },
    });
  } else {
    favorites = [{ itemId: 1, type: "movie" }];
  }

  for (let favorite of favorites) {
    let resp;
    const req = await fetch(
      `https://api.themoviedb.org/3/${favorite.type}/${favorite.itemId}?language=en-US`,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmIxMjczZjIwMTA0ZGMyNGJmZDZkZGRkYTMwMjI5MCIsInN1YiI6IjY0ZWI4NzI4YzNjODkxMDEzYWIyZjQ2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PDdWxlFxacH9WkJJtp7BJwXZJRl7LTrrY8eBGBU0lsM",
        },
      }
    );

    if (!req.ok) {
      resp = {};
    } else {
      resp = await req.json();
    }

    items.push(resp);
  }

  return json({ items });
}

export default function Bookmarks() {
  const { items } = useLoaderData();

  return (
    <>
      <div className="flex flex-wrap gap-8 justify-center">
        {items.map((item: ItemType) => (
          <Item key={item.id} item={item} bookmark={true} />
        ))}
      </div>
    </>
  );
}
