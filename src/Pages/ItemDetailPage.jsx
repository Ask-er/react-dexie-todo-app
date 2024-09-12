import ToDoDetail from "../components/ToDoDetail";
import { getListById, getTodo } from "../db/db";
import { useLoaderData, redirect } from "react-router-dom";

export default function ItemDetailPage() {
  const data = useLoaderData();
  return (
    <div className="m-8">
      <ToDoDetail todo={data.todo} listTitle={data.list.title} />
    </div>
  );
}

export async function loadTodo({ params }) {
  const { listTitle, todoId } = params;

  const todo = await getTodo(parseInt(todoId));
  if (todo) {
    const list = await getListById(todo.listId);
    return { todo: todo, list: list };
  } else {
    return redirect(`/tasks/lists/${listTitle}`);
  }
}
