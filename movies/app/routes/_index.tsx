import { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Entertainment web app" },
    { name: "description", content: "Movies gallery" },
  ];
};

export default function Index() {
  return <div className="grid place-content-center">123</div>;
}
