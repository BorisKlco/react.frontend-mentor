import { type ActionArgs, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();

  try {
    await db.user.create({
      data: {
        user: body.get("name") as string,
        psw: body.get("psw") as string,
        cookie: "",
      },
    });
  } catch (error) {
    return { error: "User exist" };
  }

  return redirect("/login");
}

export default function Register() {
  const resp = useActionData();
  return (
    <>
      <div className="grid place-items-start justify-center sm:place-content-center h-full">
        <div className="py-4 px-6 bg-slate-400 h-auto w-auto">
          <h1 className="mt-4 mb-6 text-xl font-bold text-center">Register</h1>
          <Form
            method="post"
            action="/register"
            className="flex flex-col gap-4 w-[18rem]"
          >
            <label htmlFor="name" className="w-full flex justify-between">
              Name <input type="text" name="name" className="" />
            </label>
            <label htmlFor="password" className="w-full flex justify-between">
              Psw <input type="password" name="psw" />
            </label>

            {resp ? (
              <span className="text-red-900 text-semibold">{resp.error}</span>
            ) : null}

            <button className="mt-4 py-2 px-4 border border-black">
              Register
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
