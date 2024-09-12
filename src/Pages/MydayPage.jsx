import { useLiveQuery } from "dexie-react-hooks";
import moment from "moment";

import db from "../db/db";
import { InputField } from "../components/Ui/Input";
import { formatFloat } from "../utils/format";
import ToDoItem from "../components/ToDoItem";
import { inputAddTodo } from "../utils/taskUtils";

export default function MyDayPage() {
  const date = moment();
  const hour = date.format("HH");
  const day = date.format("ddd");
  const dayOfMonth = date.format("DD");
  const month = date.format("MMMM");
  const todos = useLiveQuery(() =>
    db.todos.where("today").equals("true").toArray()
  );

  const addTask = async (val, activeList) => {
    inputAddTodo(val, activeList, date.format("DD/MM/YYYY"));
  };

  return (
    <div className="flex flex-col mx-auto overflow-hidden h-screen mt-4">
      <Title hour={hour} />
      <div
        className="mt-8 w-[600px] bg-backgroundL1 rounded-lg
    text-text px-4 py-2 flex items-center"
      >
        <TodaysDate day={day} dayOfMonth={dayOfMonth} month={month} />
        <ProgressSummary todos={todos} />
      </div>
      <div className="flex flex-col mt-8 flex-1 overflow-hidden">
        <div className="flex flex-col justify-start overflow-scroll gap-2 flex-1">
          {todos
            ?.slice()
            .reverse()
            .sort((a, b) => a.checked - b.checked)

            .map((todo, key) => (
              <ToDoItem key={key} todo={todo} styless="bgL1" />
            ))}
        </div>
        <div className="my-4">
          <InputField handleTrack={addTask} />
        </div>
      </div>
    </div>
  );
}

const Title = ({ hour }) => {
  function generateGreetings() {
    if (hour >= 3 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 15) {
      return "Good Afternoon";
    } else if (hour >= 15 && hour < 20) {
      return "Good Evening";
    } else if (hour >= 20 || hour < 3) {
      return "Good Night";
    } else {
      return "Hello";
    }
  }

  return (
    <div className="flex flex-col justify-between">
      <h1 className="font-extrabold text-5xl py-2 bg-clip-text text-transparent bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC]">
        {generateGreetings()}, User
      </h1>
      <span className="text-2xl font-semibold text-gray-500">
        What&apos;s your plan for today
      </span>
    </div>
  );
};

const TodaysDate = ({ day, dayOfMonth, month }) => (
  <div className="flex flex-col items-center">
    <p className="font-bold text-[15px] text-textgray">{day}</p>
    <p className="font-bold text-5xl">{dayOfMonth}</p>
    <p className="font-semibold text-[15px] text-textgray">{month}</p>
  </div>
);

const ProgressSummary = ({ todos }) => {
  const tasks = todos?.length || 0;
  const completedTasks = todos?.filter((todo) => todo.checked).length || 0;

  return (
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
};
