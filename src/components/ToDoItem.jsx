import { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import db from "../db/db";
import useModal from "../hooks/useModal";
import TodoModal from "./Modals/TodoModal";
import Checkbox from "./Ui/Checkbox";
export default function ToDoItem({
  todo,
  styless = "",
  dontShowList,
  dontShowModal = false,
}) {
  const [listName, setListName] = useState("");
  const [isShowingModal, toggleModal] = useModal();

  useEffect(() => {
    async function getListName() {
      const list = await db.lists.get(todo.listId);
      if (list) {
        setListName(list.title);
      }
    }
    getListName();
  }, [todo?.listId]);
  async function handleTodoCheck() {
    await db.todos.update(todo.id, { checked: !todo.checked });
  }
  async function handleTodoDelete() {
    await db.subtodo.where("todoId").equals(todo.id).delete();
    await db.todos.delete(todo.id);
  }
  const classes = {
    bgL2: "bg-backgroundL2 hover:bg-backgroundL3",
    bgL1: "bg-backgroundL1 hover:bg-backgroundL2",
    bgTransparent: "bg:transparent hover:bg-backgroundL2",
  };

  return (
    <>
      <TodoModal
        show={!dontShowModal && isShowingModal}
        onCloseButtonClick={toggleModal}
        todo={todo}
        listTitle={listName}
      />

      <div
        className={`flex relative w-full px-4 py-1 items-center group animate-fadeIn rounded-lg
    text-text ${classes[styless]} transition-all duration-300`}
      >
        <div className="mt-2">
          <Checkbox checked={todo?.checked} onChange={handleTodoCheck} />
        </div>

        <div
          className="flex flex-col ml-6 gap-1 w-full cursor-pointer"
          onClick={toggleModal}
        >
          <p
            className={`${dontShowList ? "hidden" : ""} text-sm text-textgray`}
          >
            MyList &gt; {listName}
          </p>
          <p
            className={`text-lg text-text ${
              todo?.checked ? "line-through" : ""
            }`}
          >
            {todo.title}
          </p>
        </div>

        <div className="hidden group-hover:block group-hover:animate-slideInFromRight ml-auto text-textgray size-6">
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

/*    <DropdownWrapper
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
          </DropdownWrapper> */
