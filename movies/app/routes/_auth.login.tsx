import { ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  console.log(body.get("name"), body.get("psw"));

  return { ok: "ok" };
}

export default function Login() {
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

            <button className="mt-4 py-2 px-4 border border-black">
              Login
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
