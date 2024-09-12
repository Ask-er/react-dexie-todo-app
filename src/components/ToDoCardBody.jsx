import { useLiveQuery } from "dexie-react-hooks";
import db from "../db/db";
import ToDoItem from "./ToDoItem";
import { InputField } from "./Ui/Input";
import { inputAddTodo } from "../utils/taskUtils";
export default function ToDoCardBody({ date }) {
  const todos = useLiveQuery(
    () => db.todos.where("date").equals(date.format("DD/MM/YYYY")).toArray(),
    [date]
  );
  async function addTask(val, activeList) {
    inputAddTodo(val, activeList, date.format("DD/MM/YYYY"));
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
              <ToDoItem key={key} todo={todo} styless="bgL2" />
            ))}
        </div>
      </div>
      <div className="my-4">
        <InputField handleTrack={addTask} />
      </div>
    </div>
  );
}
