import { FaEllipsisV } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { IoCheckmarkDone } from "react-icons/io5";
import { BsArrowDownShort, BsTrash3 } from "react-icons/bs";
import { DropdownItem, DropdownWrapper } from "./Ui/Dropdown";
export default function ToDoCardHeader({ date }) {
  const day = date.format("dddd");
  const dayOfMonth = date.format("MMMM D");
  const year = date.format("YYYY");
  function handleAddTask() {
    console.log("Adding new task");
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
          <DropdownItem onClick={handleAddTask}>
            <GoPlus className="mr-2" /> <span>New Task</span>
          </DropdownItem>
          <DropdownItem>
            <IoCheckmarkDone className="mr-2" /> <span>Complete All</span>
          </DropdownItem>
          <DropdownItem>
            <BsArrowDownShort className="mr-2" /> <span>Reorder</span>
          </DropdownItem>
          <DropdownItem>
            <BsArrowDownShort className="mr-2" /> <span>Postpone</span>
          </DropdownItem>
          <DropdownItem>
            <BsArrowDownShort className="mr-2" /> <span>Copy Tasks</span>
          </DropdownItem>
          <DropdownItem>
            <BsTrash3 className="mr-2" /> <span>Clear List</span>
          </DropdownItem>
        </DropdownWrapper>
      </div>
    </div>
  );
}
