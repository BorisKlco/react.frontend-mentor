import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import ErrorPage from "./ErrorPage.tsx";
import Todo from "./routes/todo/todo.tsx";
import Psw from "./routes/psw/psw.tsx";
import Dictionary from "./routes/dictionary/dictionary.tsx";

const queryClient = new QueryClient();

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
        path: "dictionary",
        element: <Dictionary />,
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
