import { redirect } from "@remix-run/node";

export async function action({ request }: any) {
  const data = await request.formData();
  console.log(data.get("id"));

  return redirect(data.get("path"));
}

export default function Add() {
  return null;
}
