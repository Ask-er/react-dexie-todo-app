import { FaEllipsisV } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import { BsArrowRightShort, BsTrash3 } from "react-icons/bs";
import { DropdownItem, DropdownWrapper } from "./Ui/Dropdown";
import db from "../db/db";
export default function ToDoCardHeader({ date }) {
  const day = date.format("dddd");
  const dayOfMonth = date.format("MMMM D");
  const year = date.format("YYYY");
  async function completeAll() {
    await db.todos
      .where("date")
      .equals(date.format("DD/MM/YYYY"))
      .modify({ checked: true });
  }
  async function clearList() {
    await db.todos.where("date").equals(date.format("DD/MM/YYYY")).delete();
  }
  async function postPoneAll() {
    await db.todos
      .where("date")
      .equals(date.format("DD/MM/YYYY"))
      .modify({
        date: date.clone().add(1, "day").format("DD/MM/YYYY"),
        today: "false",
      });
    await clearList();
  }
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-center flex-grow">
          <h4 className="font-bold text-2xl underline">{day}</h4>
          <span className="text-gray-500">
            {dayOfMonth}, {year}
          </span>
        </div>
        <DropdownWrapper
          icon={
            <FaEllipsisV className="text-2xl cursor-pointer pr-2 text-gray-500 hover:text-gray-400 transition-colors" />
          }
        >
          <DropdownItem onClick={completeAll}>
            <IoCheckmarkDone className="mr-2" />
            <span>Complete All</span>
          </DropdownItem>
          <DropdownItem onClick={postPoneAll}>
            <BsArrowRightShort className="mr-2" /> <span>Postpone</span>
          </DropdownItem>
          <DropdownItem onClick={clearList}>
            <BsTrash3 className="mr-2" /> <span>Clear List</span>
          </DropdownItem>
        </DropdownWrapper>
      </div>
    </div>
  );
}
