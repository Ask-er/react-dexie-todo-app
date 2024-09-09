import moment from "moment";
import { InputIconField } from "./Ui/Input";
import db from "../db/db";
import { formatFloat } from "../utils/format";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import ToDoItem from "./TodoItem";
import { inputAddTodo } from "../utils/taskUtils";

export default function MyDay() {
  const [tasks, setTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const date = moment();
  const day = date.format("ddd");
  const dayOfMonth = date.format("DD");
  const month = date.format("MMMM");
  const todos = useLiveQuery(() =>
    db.todos.where("today").equals("true").toArray()
  );

  useEffect(() => {
    setTasks(todos?.length);
    setCompletedTasks(todos?.filter((todo) => todo.checked).length);
  }, [todos]);

  const addTask = async (val, activeList) => {
    inputAddTodo(val, activeList, date.format("DD/MM/YYYY"));
  };

  return (
    <div className="flex flex-col mx-auto overflow-hidden h-screen mt-4">
      <Title />
      <div className="mt-8 w-[600px] glasscard px-4 py-2 flex items-center">
        <TodaysDate day={day} dayOfMonth={dayOfMonth} month={month} />
        <ProgressSummary tasks={tasks} completedTasks={completedTasks} />
      </div>
      <div className="flex flex-col mt-8 flex-1 overflow-hidden">
        <div className="flex flex-col justify-start overflow-scroll gap-2 flex-1">
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
                styless="bgHoverDark"
              />
            ))}
        </div>
        <div className="my-4">
          <InputIconField handleTrack={addTask} />
        </div>
      </div>
    </div>
  );
}

const Title = () => (
  <div className="flex flex-col justify-between">
    <h1 className="font-extrabold text-5xl py-2 bg-clip-text text-transparent bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC]">
      Good Night, User
    </h1>
    <span className="text-2xl font-semibold text-gray-500">
      What&apos;s your plan for today
    </span>
  </div>
);
const TodaysDate = ({ day, dayOfMonth, month }) => (
  <div className="flex flex-col items-center">
    <p className="font-bold text-[15px] text-gray-300">{day}</p>
    <p className="font-bold text-5xl">{dayOfMonth}</p>
    <p className="font-semibold text-[15px]">{month}</p>
  </div>
);

const ProgressSummary = ({ tasks, completedTasks }) => (
  <div className="w-full m-4">
    <p className="font-semibold text-lg ">Today&apos;s progress summary</p>
    <p className="font-semibold text-sm text-gray-500 mb-2">
      Tasks: {tasks} | Completed: {completedTasks}
    </p>
    <div className="flex items-center w-full">
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-green-500 h-full transition-width duration-500"
          style={{ width: `${formatFloat((completedTasks / tasks) * 100)}%` }}
        ></div>
      </div>
      <span className="ml-2 font-semibold">
        {formatFloat((completedTasks / tasks) * 100)}%
      </span>
    </div>
  </div>
);
