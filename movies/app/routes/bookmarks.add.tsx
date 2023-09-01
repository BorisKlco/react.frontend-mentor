import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { getSession } from "~/sessions";

export async function action({ request }: any) {
  const body = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    console.log("missing cookie");
    return redirect("/login");
  }

  const bookmarkExist = await db.favorite.findFirst({
    where: {
      name: session.get("userId") as string,
      itemId: +body.get("id") as number,
    },
  });

  if (bookmarkExist) {
    await db.favorite.deleteMany({
      where: {
        name: session.get("userId") as string,
        itemId: +body.get("id") as number,
      },
    });

    console.log("Removing existing Bookmark");

    return redirect(body.get("path"));
  }

  await db.favorite.create({
    data: {
      itemId: +body.get("id") as number,
      type: body.get("type") as string,
      name: session.get("userId") as string,
    },
  });

  console.log("Adding Bookmark");
  return redirect(body.get("path"));
}

export default function Add() {
  return null;
}
