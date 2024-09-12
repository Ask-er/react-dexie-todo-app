import { GoGoal as MydayIcon } from "react-icons/go";
import { CiViewList as ListIcon } from "react-icons/ci";
import Tooltip from "./Ui/ToolTip";
import db from "../db/db";
import { InputPlaceholder } from "./Ui/Input";
import SubTask from "./SubTask";
import { useEffect, useState } from "react";

export default function ToDoDetail({ todo, listTitle }) {
  return (
    <>
      <TodoDetailHeader headerTodo={todo} listTitle={listTitle} />
      <ListDetailTitle listTitle={listTitle} todo={todo} />
      <p className="text-textgray text-lg">NOTES</p>
      <InputPlaceholder todo={todo} />
      <p className="text-textgray text-lg">SUBTASKS</p>
      <SubTask todoId={todo.id} />
    </>
  );
}

const TodoDetailHeader = ({ headerTodo, listTitle }) => {
  const [todo, setTodo] = useState(headerTodo);
  useEffect(() => {
    setTodo(headerTodo);
  }, [headerTodo]);
  async function handleEvent(todoId) {
    if (todo?.today === "false") {
      await db.todos.update(todoId, { today: "true" });
      setTodo({ ...todo, today: "true" });
      return;
    }
    await db.todos.update(todoId, { today: "false" });
    setTodo({ ...todo, today: "false" });
  }
  async function handleUpdateChecked() {
    await db.todos.update(todo.id, { checked: !todo.checked });
    setTodo({ ...todo, checked: !todo.checked });
  }

  return (
    <div className="flex">
      <p className="text-textgray"> MyList &gt; {listTitle}</p>
      <div className="ml-auto flex gap-4 text-textgray">
        <button
          onClick={handleUpdateChecked}
          className={`appearance-none px-2 bg-background rounded-md shadow-[0_0px_15px_rgba(0,0,0,0.4)] transform active:scale-x-75 transition hover:text-primary-400 ${
            todo?.checked ? "text-primary-400" : ""
          }`}
        >
          Mark as complete
        </button>
        <Tooltip
          message={
            todo?.today === "true" ? "Remove from Myday" : "Add to Myday"
          }
        >
          <MydayIcon
            size="24"
            className={`transform active:scale-75 transition-transform hover:text-primary-400 ${
              todo?.today === "true" ? "text-primary-400" : ""
            }`}
            onClick={() => handleEvent(todo?.id)}
          />
        </Tooltip>
      </div>
    </div>
  );
};
const ListDetailTitle = ({ listTitle, todo }) => {
  function changeListModal() {
    console.log("change list modal");
  }
  return (
    <>
      <h2 className="text-text text-4xl">{todo?.title}</h2>
      <div
        className="flex my-4 p-2 bg-backgroundL2 rounded-lg items-center w-1/4 cursor-pointer text-textgray hover:bg-backgroundL3 hover:text-yellow-300"
        onClick={changeListModal}
      >
        <ListIcon size={26} className=" text-yellow-300" />
        <h4 className="ml-2">{listTitle}</h4>
      </div>
    </>
  );
};
