import Error from "./components/Error";
import Layout from "./components/Layout";
import MyDayPage from "./pages/MyDayPage";
import Next7TodoPage from "./pages/Next7TodoPage";
import ListDetailPage, { loadList } from "./pages/ListDetailPage";
import ItemDetailPage, { loadTodo } from "./pages/ItemDetailPage";
import { Navigate } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "myday",
          element: <MyDayPage />,
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
              element: <Next7TodoPage />,
            },
            {
              path: "lists/:listTitle",
              element: <ListDetailPage />,
              loader: loadList,
              children: [
                {
                  path: "tasks",
                  element: <Navigate to=".." replace relative="path" />,
                },
                {
                  path: "tasks/:todoId",
                  element: <ItemDetailPage />,
                  loader: loadTodo,
                },
              ],
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
