import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ErrorPage from "./ErrorPage.tsx";
import Todo from "./routes/todo/todo.tsx";
import Calc from "./routes/calc/calc.tsx";
import Psw from "./routes/psw/psw.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "todo",
        element: <Todo />,
      },
      {
        path: "calc",
        element: <Calc />,
      },
      {
        path: "psw",
        element: <Psw />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
