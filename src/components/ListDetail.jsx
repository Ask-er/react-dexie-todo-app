import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { json } from "react-router-dom";
import db, { getList, addTodo } from "../db/db";
import { useLiveQuery } from "dexie-react-hooks";
import ToDoItem from "./TodoItem";
import { GoGoal as Myday } from "react-icons/go";
import { InputIconField } from "./Ui/Input";
import { formatDate } from "../utils/format";
import Tooltip from "./Ui/ToolTip";
const ListDetail = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const data = useLoaderData();
  const listTitle = data.title;
  const listId = data.id;
  const todos = useLiveQuery(() =>
    db.todos.where("listId").equals(listId).toArray()
  );

  async function addTodayTask(val, activeList) {
    if (val.length !== 0) {
      const primaryKey = await getList(activeList);
      await addTodo({
        title: val,
        listId: primaryKey.id,
        checked: false,
        date: formatDate(new Date()),
      });
    }
  }
  async function handleEvent(todoId) {
    await db.todos.update(todoId, { date: null });
    setSelectedTodo({ ...selectedTodo, today: false });
  }

  if (selectedTodo) {
    const isToday = selectedTodo.date === formatDate(new Date());
    if (!selectedTodo?.today && isToday) {
      setSelectedTodo({ ...selectedTodo, today: true });
    }
  }
  console.log(selectedTodo);
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
      <div className="w-1/2 bg-backgroundL1 m-8 rounded-3xl text-sm max-h-[calc(100vh-150px)]">
        <div className="flex m-8">
          <p className="text-textgray"> MyList &gt; {listTitle}</p>
          <div className="ml-auto flex gap-4 text-textgray">
            <button className="appearance-none px-2 bg-background rounded-md shadow-[0_0px_15px_rgba(0,0,0,0.4)] transform active:scale-x-75 transition hover:text-primary-400">
              Mark as complete
            </button>
            <Tooltip
              message={
                selectedTodo?.today ? "Remove from Myday" : "Add to Myday"
              }
            >
              <Myday
                size="24"
                className={`transform active:scale-75 transition-transform hover:text-primary-400 ${
                  selectedTodo?.today ? "text-primary-400" : ""
                }`}
                onClick={() => handleEvent(selectedTodo.id)}
              />
            </Tooltip>
          </div>
        </div>
        <h2 className="text-text text-3xl ml-8">{selectedTodo?.title}</h2>
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

export default ListDetail;
