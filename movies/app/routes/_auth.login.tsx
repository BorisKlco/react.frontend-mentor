import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { userCookie } from "~/cookie.server";

export async function loader({ request }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userCookie.parse(cookieHeader)) || {};
  console.log("WE HIT LOADET --> COOKIE:", cookie.login);

  if (cookie.login) {
    console.log("COOKIE EXIST, GO NEXT");
    try {
      const logged = await db.user.findFirstOrThrow({
        where: {
          cookie: cookie.login,
        },
      });
      console.log("LOGGED1", logged);
      return redirect("/");
    } catch (error) {
      console.log("COOKIE NOT IN DB");
      return null;
    }
  }
  console.log("COOKIE DOESNT EXIT");
  return null;
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userCookie.parse(cookieHeader)) || {};

  try {
    const login = await db.user.findUniqueOrThrow({
      where: {
        user: body.get("name") as string,
      },
    });

    if (login.psw === body.get("psw")) {
      const newCookie = String(Math.random());
      await db.user.update({
        where: {
          user: login.user,
        },
        data: {
          cookie: newCookie,
        },
      });
      cookie.login = newCookie;
      return redirect("/", {
        headers: {
          "Set-Cookie": await userCookie.serialize(cookie),
        },
      });
    }
  } catch (error) {
    return { error: "Wrong username" };
  }

  return { error: "Wrong password" };
}

export default function Login() {
  const resp = useActionData();
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
            {resp && resp.error ? (
              <span className="text-red-900 text-semibold">{resp.error}</span>
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
