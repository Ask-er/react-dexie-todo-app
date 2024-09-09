import Error from "./components/Error";
import Layout from "./components/Layout";
import MyDay from "./components/MyDay";
import ToDoList from "./components/ToDoList";
import { Navigate } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListDetail, { loadList } from "./components/ListDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "myday",
          element: <MyDay />,
        },
        {
          path: "tasks",
          errorElement: <Error />,
          children: [
            {
              path: "",
              element: <Navigate to="/myday" replace />,
            },
            {
              path: "next-7-days",
              element: <ToDoList />,
            },
            { path: "allmytasks", element: <ToDoList /> },
            {
              path: "lists/:listTitle",
              element: <ListDetail />,
              loader: loadList,
            },
          ],
        },
        {
          path: "/",
          element: <Navigate to="/myday" replace />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
