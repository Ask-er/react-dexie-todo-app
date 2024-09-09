import { useEffect, useState } from "react";
import { DropdownWrapper, DropdownItem } from "./Ui/Dropdown";
import { CiEdit } from "react-icons/ci";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import db from "../db/db";
import useModal from "../hooks/useModal";
import TodoModal from "./Modals/TodoModal";
import Checkbox from "./Ui/Checkbox";
export default function ToDoItem({
  id,
  title,
  listId,
  checked,
  styless = "",
  dontShowList,
  dontShowModal = false,
}) {
  const [listName, setListName] = useState("");
  const [isShowingModal, toggleModal] = useModal();

  useEffect(() => {
    async function getListName() {
      const list = await db.lists.get(listId);
      if (list) {
        setListName(list.title);
      }
    }
    getListName();
  }, [listId]);
  async function handleTodoCheck() {
    const todo = await db.todos.get(Number(id));
    if (todo) {
      await db.todos.update(Number(id), { checked: !todo.checked });
    }
  }
  async function handleTodoDelete() {
    await db.todos.delete(Number(id));
  }
  const classes = {
    bgHoverLight: "dark:bg-backgroundL2 dark:hover:bg-backgroundL3",
    bgHoverDark: "dark:hover:bg-backgroundL2",
  };

  return (
    <>
      <TodoModal
        show={!dontShowModal && isShowingModal}
        onCloseButtonClick={toggleModal}
      />

      <div
        className={`glasscard ${classes[styless]} flex relative w-full px-4 py-1 items-center group animate-fadeIn`}
      >
        <Checkbox id={id} checked={checked} onChange={handleTodoCheck} />

        <div
          className="flex flex-col ml-6 gap-1 w-full cursor-pointer"
          onClick={toggleModal}
        >
          <p
            className={`${dontShowList ? "hidden" : ""} text-sm text-textgray`}
          >
            MyList &gt; {listName}
          </p>
          <label
            htmlFor={id}
            className={`text-lg text-text ${checked ? "line-through" : ""}`}
          >
            {title}
          </label>
        </div>

        <div className="hidden absolute group-hover:flex top-2 right-4 text-textgray transition duration-300">
          <DropdownWrapper
            icon={
              <BiDotsVerticalRounded
                size={20}
                className="hover:text-primary-400"
              />
            }
          >
            <DropdownItem onClick={() => console.log("edit")}>
              <CiEdit className="mr-2" size={18} /> <span>Edit</span>
            </DropdownItem>
          </DropdownWrapper>
          <GiCancel
            size={20}
            onClick={handleTodoDelete}
            className="hover:text-primary-400"
          />
        </div>
      </div>
    </>
  );
}
