import { useLiveQuery } from "dexie-react-hooks";
import db, { addTodo, getList } from "../db/db";
import ToDoItem from "./TodoItem";
import { InputIconField } from "./Ui/Input";

export default function ToDoCardBody({ date }) {
  const todos = useLiveQuery(
    () => db.todos.where("date").equals(date.format("DD/MM/YYYY")).toArray(),
    [date]
  );
  async function addTask(val, activeList) {
    if (val.length !== 0) {
      const primaryKey = await getList(activeList);
      await addTodo({
        title: val,
        listId: primaryKey.id,
        checked: false,
        date: date.format("DD/MM/YYYY"),
      });
    }
  }
  return (
    <div className="flex flex-col mt-6 flex-1 overflow-hidden">
      <div className="flex flex-col justify-start overflow-scroll gap-2 flex-1">
        <div className="flex-1 max-h-[calc(88vh-200px)] overflow-scroll flex flex-col gap-2">
          {todos
            ?.slice()
            .reverse()
            .sort((a, b) => a.checked - b.checked)
            .map((todo, key) => (
              <ToDoItem
                key={key}
                title={todo.title}
                id={todo.id}
                listId={todo.listId}
                checked={todo.checked}
                styless="bgHoverLight"
              />
            ))}
        </div>
      </div>
      <div className="my-4">
        <InputIconField handleTrack={addTask} />
      </div>
    </div>
  );
}
