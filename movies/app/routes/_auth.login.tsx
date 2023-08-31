import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { getSession, commitSession } from "~/sessions";

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  // if (!session.has("userId")) {
  //   console.log("redirect from /login to /");
  //   return redirect("/");
  // }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));

  try {
    const login = await db.user.findUniqueOrThrow({
      where: {
        user: body.get("name") as string,
      },
    });

    if (login.psw === body.get("psw")) {
      session.set("userId", login.user);
      return redirect("/", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  } catch (error) {
    session.flash("error", "Invalid username");
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  session.flash("error", "Invalid password");
  return redirect("/login", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  const { error } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="grid place-items-start justify-center sm:place-content-center h-full">
        <div className="py-4 px-6 bg-slate-400 h-auto w-auto">
          <h1 className="mt-4 mb-6 text-xl font-bold text-center">Log In</h1>
          <Form
            method="post"
            action="/login"
            className="flex flex-col gap-4 w-[18rem]"
          >
            <label htmlFor="name" className="w-full flex justify-between">
              Name <input type="text" name="name" className="" />
            </label>

            <label htmlFor="password" className="w-full flex justify-between">
              Psw <input type="password" name="psw" />
            </label>
            {error ? (
              <span className="text-red-900 text-semibold">{error}</span>
            ) : null}

            <button className="mt-4 py-2 px-4 border border-black">
              Login
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
