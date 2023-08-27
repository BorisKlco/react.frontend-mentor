import { ActionArgs, LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Entertainment web app" },
    { name: "description", content: "Movies gallery" },
  ];
};

export async function loader({ params }: LoaderArgs) {
  const data = await db.movie.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return json({ data });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const data = await db.movie.create({
    data: {
      imdb: formData.get("imdb") as string,
      name: formData.get("name") as string,
      url: formData.get("url") as string,
    },
  });

  return json({ data });
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  const nav = useNavigation();

  return (
    <div className="grid place-content-center">
      <h1>Welcome to Remix</h1>
      <Form method="POST" className="flex flex-col gap-2">
        <p className="p-2 border border-black w-[24rem] inline-flex gap-4">
          IMDB{" "}
          <input type="text" name="imdb" className="px-2 bg-gray-200 w-full" />
        </p>
        <p className="p-2 border border-black w-[24rem] inline-flex gap-4">
          Name{" "}
          <input type="text" name="name" className="px-2 bg-gray-200 w-full" />
        </p>
        <p className="p-2 border border-black w-[24rem] inline-flex gap-4">
          url{" "}
          <input type="text" name="url" className="px-2 bg-gray-200 w-full" />
        </p>
        <button
          disabled={nav.state === "submitting"}
          className="py-2 px-4 mt-2 border border-black"
        >
          Submit
        </button>
      </Form>

      <div className="mt-6 border border-black py-4 px-2 w-[36rem] flex flex-col">
        <h1 className="py-2 text-3xl">Movies</h1>
        <div className="w-full flex flex-wrap gap-3">
          {data.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col gap-2 p-2 rounded border border-gray w-[8rem] truncate"
            >
              <p className="text-xl">{movie.name}</p>
              <p>{movie.imdb}</p>
              <p>{movie.url}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
