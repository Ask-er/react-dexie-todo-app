import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { json } from "react-router-dom";
import db, { getList } from "../db/db";
import { useLiveQuery } from "dexie-react-hooks";
import ToDoItem from "./TodoItem";
import { GoGoal as Myday } from "react-icons/go";
import { InputIconField } from "./Ui/Input";
import { formatDate } from "../utils/format";
import Tooltip from "./Ui/ToolTip";
import { inputAddTodo } from "../utils/taskUtils";
import { CiViewList } from "react-icons/ci";
const ListDetail = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [inputNoteValue, setInputNoteValue] = useState("");
  const data = useLoaderData();
  const listTitle = data.title;
  const listId = data.id;
  const todos = useLiveQuery(
    () => db.todos.where("listId").equals(listId).toArray(),
    [listId]
  );
  if (todos && selectedTodo === null) setSelectedTodo(todos[0]); // Still loading

  async function addTodayTask(val, activeList) {
    inputAddTodo(val, activeList, formatDate(new Date()));
  }
  async function handleTodayTodo(todoId) {
    if (selectedTodo?.today === "false") {
      await db.todos.update(todoId, { today: "true" });
      setSelectedTodo({ ...selectedTodo, today: "true" });
      return;
    }
    await db.todos.update(todoId, { today: "false" });
    setSelectedTodo({ ...selectedTodo, today: "false" });
  }

  const handleUpdateNote = async () => {
    if (selectedTodo) {
      await db.todos.update(selectedTodo.id, { notes: inputNoteValue });
    }
    setInputNoteValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdateNote();
    }
  };

  return (
    <div className="h-screen w-full flex">
      <div className="flex flex-col m-8 overflow-hidden w-1/2 bg-backgroundL1 rounded-3xl max-h-[calc(100vh-150px)]">
        <div className="overflow-scroll flex flex-col gap-3 max-h-[calc(90vh-150px)]">
          {todos?.map((todo, key) => (
            <div key={key} onClick={() => setSelectedTodo(todo)}>
              <ToDoItem
                title={todo.title}
                id={todo.id}
                listId={todo.listId}
                checked={todo.checked}
                styless="bgHoverDark"
                dontShowList={true}
                dontShowModal={true}
              />
            </div>
          ))}
        </div>
        <div className="mt-auto py-4 bg-backgroundL2 ">
          <InputIconField handleTrack={addTodayTask} />
        </div>
      </div>
      <div className="w-1/2 bg-backgroundL1 m-8 rounded-3xl text-sm max-h-[calc(100vh-150px)] overflow-y-scroll overflow-x-hidden animate-fadeIn">
        <ListDetailHeader
          selectedTodo={selectedTodo}
          listTitle={listTitle}
          handleEvent={handleTodayTodo}
        />
        <ListDetailTitle listTitle={listTitle} selectedTodo={selectedTodo} />

        <p className="text-textgray ml-8 text-lg">NOTES</p>
        <input
          type="text"
          placeholder={
            selectedTodo?.notes === ""
              ? "Insert your notes here"
              : selectedTodo?.notes
          }
          value={inputNoteValue}
          onChange={(e) => setInputNoteValue(e.target.value)}
          onFocus={() => setInputNoteValue(selectedTodo?.notes)}
          onKeyDown={handleKeyDown}
          onBlur={handleUpdateNote}
          className="bg-transparent w-full pt-2 mb-4 focus:outline-none text-xl text-gray-600 placeholder:text-gray-600 ml-8"
        />
        <p className="text-textgray ml-8 text-lg">SUBTASKS</p>
      </div>
    </div>
  );
};
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

const ListDetailHeader = ({ selectedTodo, listTitle, handleEvent }) => {
  return (
    <div className="flex m-8">
      <p className="text-textgray"> MyList &gt; {listTitle}</p>
      <div className="ml-auto flex gap-4 text-textgray">
        <button className="appearance-none px-2 bg-background rounded-md shadow-[0_0px_15px_rgba(0,0,0,0.4)] transform active:scale-x-75 transition hover:text-primary-400">
          Mark as complete
        </button>
        <Tooltip
          message={
            selectedTodo?.today === "true"
              ? "Remove from Myday"
              : "Add to Myday"
          }
        >
          <Myday
            size="24"
            className={`transform active:scale-75 transition-transform hover:text-primary-400 ${
              selectedTodo?.today === "true" ? "text-primary-400" : ""
            }`}
            onClick={() => handleEvent(selectedTodo?.id)}
          />
        </Tooltip>
      </div>
    </div>
  );
};
const ListDetailTitle = ({ listTitle, selectedTodo }) => (
  <>
    <h2 className="text-text text-4xl ml-8">{selectedTodo?.title}</h2>
    <div className="flex ml-8 my-4 p-2 bg-backgroundL2 rounded-lg items-center w-1/4">
      <CiViewList size={26} className=" text-yellow-300" />
      <p className="text-textgray ml-2">{listTitle}</p>
    </div>
  </>
);
export default ListDetail;
