import { type ActionArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();

  try {
    await db.user.create({
      data: {
        name: body.get("name") as string,
        psw: body.get("psw") as string,
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
        <div className="py-4 px-6 bg-slate-700 h-auto w-auto rounded-md text-white">
          <h1 className="mt-4 mb-6 text-xl font-bold text-center">Register</h1>
          <Form
            method="post"
            action="/register"
            className="flex flex-col gap-4 w-[18rem]"
          >
            <label htmlFor="name" className="w-full flex justify-between">
              Name <input type="text" name="name" className="text-black" />
            </label>
            <label htmlFor="password" className="w-full flex justify-between">
              Psw <input type="password" name="psw" className="text-black" />
            </label>

            {resp ? (
              <span className="text-red-900 text-semibold">{resp.error}</span>
            ) : null}

            <button className="mt-4 py-2 px-4 border border-slate-500 bg-slate-600 rounded-md hover:bg-slate-500">
              Register
            </button>
            <Link
              to={`/login`}
              className=" py-2 px-4 border border-slate-500 bg-slate-600 text-center rounded-md"
            >
              Login
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
}
