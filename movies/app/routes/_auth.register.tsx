import { ActionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { db } from "~/utils/db.server";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();

  const reg = await db.user.create({
    data: {
      user: body.get("name") as string,
      psw: body.get("psw") as string,
      cookie: "123",
    },
  });

  return json({ reg });
}

export default function Register() {
  return (
    <>
      <div className="grid place-items-start justify-center sm:place-content-center h-full">
        <div className="py-4 px-6 bg-slate-400 h-auto w-auto">
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

            <button className="mt-4 py-2 px-4 border border-black">
              Register
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
