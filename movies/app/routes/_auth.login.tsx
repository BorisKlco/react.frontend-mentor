import { ActionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { db } from "~/utils/db.server";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  try {
    const login = await db.user.findUniqueOrThrow({
      where: {
        user: body.get("name") as string,
      },
    });

    if (login.psw === body.get("psw")) {
      return { status: "ok" };
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
