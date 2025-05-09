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
    <div className="flex flex-col mt-6 flex-1 max-h-[calc(99vh-200px)]">
      <div className="flex flex-1 flex-col min-h-16 gap-2 custom-scrollbar">
        {todos
          ?.slice()
          .reverse()
          .sort((a, b) => a.checked - b.checked)
          .map((todo, key) => (
            <ToDoItem key={key} todo={todo} styless="bgL2" />
          ))}
      </div>

      <div className="my-4">
        <InputField handleTrack={addTask} />
      </div>
    </div>
  );
}
