import { type LoaderArgs, type V2_MetaFunction, json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import Item from "~/components/item";
import { type ItemType } from "~/helpers";
import { db } from "~/utils/db.server";
import { getSession } from "~/sessions";

export const meta: V2_MetaFunction = () => {
  let locationTitle = "Movie/TV gallery";

  return [
    { title: locationTitle },
    { name: "description", content: "Movies/TV gallery" },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  if (q) {
    const req = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${q}`,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmIxMjczZjIwMTA0ZGMyNGJmZDZkZGRkYTMwMjI5MCIsInN1YiI6IjY0ZWI4NzI4YzNjODkxMDEzYWIyZjQ2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PDdWxlFxacH9WkJJtp7BJwXZJRl7LTrrY8eBGBU0lsM",
        },
      }
    );

    return json(await req.json());
  }

  const session = await getSession(request.headers.get("Cookie"));
  let favorites;
  const req = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?language=en-US`,
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
  const data = useLoaderData();
  const submit = useSubmit();

  return (
    <>
      <Form
        className="w-full px-12 mb-4 mt-2"
        id="search-form"
        onChange={(event) => submit(event.currentTarget)}
        role="search"
      >
        <input
          id="q"
          name="q"
          className="w-full px-4 py-2 text-xl bg-slate-600 text-slate-300 rounded-md"
          placeholder="Search"
          type="search"
        />
      </Form>
      <div className="flex flex-wrap gap-8 justify-center">
        {data.results
          ? data.results.map((item: ItemType) => (
              <Item key={item.id} item={item} bookmark={false} />
            ))
          : null}

        {data.items
          ? data.items.results.map((item: ItemType) => {
              if (
                data.favorites.some(
                  (favorite: { itemId: number }) => favorite.itemId === item.id
                )
              ) {
                return <Item key={item.id} item={item} bookmark={true} />;
              } else {
                return <Item key={item.id} item={item} bookmark={false} />;
              }
            })
          : null}
      </div>
    </>
  );
}
