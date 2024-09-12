import db, { getList } from "../db/db";
import { Suspense } from "react";
import { json, useLoaderData, Outlet } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import ToDoItem from "../components/TodoItem";
import { InputField } from "../components/Ui/Input";
import { inputAddTodo } from "../utils/taskUtils";
import { formatDate } from "../utils/format";
import { NavLink } from "react-router-dom";
export default function ListDetailPage() {
  const data = useLoaderData();
  const listId = data.id;
  const listTitle = data.title;
  const todos = useLiveQuery(
    () => db.todos.where("listId").equals(listId).toArray(),
    [listId]
  );
  async function addTodayTask(val, activeList) {
    inputAddTodo(val, activeList, formatDate(new Date()));
  }
  return (
    <div className="h-screen w-full flex">
      <div className="flex flex-col m-8 overflow-hidden w-1/2 bg-backgroundL1 rounded-xl max-h-[calc(100vh-150px)]">
        <div className="mt-4 overflow-scroll flex flex-col gap-3 max-h-[calc(90vh-150px)]">
          {todos
            ?.slice()
            .reverse()
            .sort((a, b) => a.checked - b.checked)
            .map((todo, key) => (
              <NavLink
                key={key}
                className={({ isActive }) =>
                  isActive
                    ? "bg-backgroundL2 mx-2 rounded-md py-2"
                    : "mx-2 rounded-md py-2"
                }
                to={`/tasks/lists/${listTitle}/tasks/${todo.id}`}
              >
                <ToDoItem
                  todo={todo}
                  styless="bgTransparent"
                  dontShowList={true}
                  dontShowModal={true}
                />
              </NavLink>
            ))}
        </div>
        <div className="mt-auto py-4 bg-backgroundL2 ">
          <InputField handleTrack={addTodayTask} currentList={listTitle} />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-1/2 bg-backgroundL1 m-8 rounded-xl text-sm max-h-[calc(100vh-150px)] overflow-y-scroll overflow-x-hidden animate-fadeIn">
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
}

export async function loadList({ params }) {
  const listTitle = params.listTitle;
  const response = await getList(listTitle);

  if (response) {
    return response;
  } else {
    throw json(
      { message: "Couldn't fetch details for this List" },
      { status: 500 }
    );
  }
}
