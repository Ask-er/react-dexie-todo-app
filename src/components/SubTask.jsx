import { useLiveQuery } from "dexie-react-hooks";
import db from "../db/db";
import Checkbox from "./Ui/Checkbox";
import { MdCancel } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import AnimatedIcon from "./Ui/AnimatedIcon";
export default function SubTask({ todoId }) {
  const subtasks = useLiveQuery(
    () => db.subtodo.where("todoId").equals(todoId).toArray(),
    [todoId]
  );
  return (
    <div className="flex flex-col mt-2 mx-6">
      {subtasks?.map((subtask, key) => (
        <SubTaskItem key={key} subtask={subtask} />
      ))}
      <SubTaskInput todoId={todoId} />
    </div>
  );
}
function SubTaskInput({ todoId }) {
  const [inputNoteValue, setInputNoteValue] = useState("");
  const [clicked, setClicked] = useState(false);
  const inputRef = useRef(null);
  const divRef = useRef(null);
  const handleShowInput = () => {
    setClicked(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };
  async function handleAddNote() {
    if (inputNoteValue === "") return setClicked(false);
    await db.subtodo.add({
      todoId: todoId,
      title: inputNoteValue,
      checked: false,
    });
    setInputNoteValue("");
    setClicked(false);
    divRef.current.classList.remove(
      "ring-2",
      "ring-primary-400",
      "ring-offset-0"
    );
  }
  return (
    <div className="flex flex-col w-full">
      <div
        className={`${
          !clicked ? "hidden" : "flex"
        } items-center rounded-md p-2 `}
        ref={divRef}
      >
        <div className="size-5 rounded-full border border-textgray"></div>
        <input
          ref={inputRef}
          value={inputNoteValue}
          onChange={(e) => setInputNoteValue(e.target.value)}
          onBlur={handleAddNote}
          onFocus={() => {
            divRef.current.classList.add(
              "ring-2",
              "ring-primary-400",
              "ring-offset-0"
            );
          }}
          className="w-full outline-none appearance-none text-text text-lg pl-1 bg-transparent"
        />
      </div>

      <div
        className="flex items-center cursor-pointer group ml-2"
        onClick={() => {
          handleShowInput();
        }}
      >
        <div className="size-5 rounded-full border border-textgray group-hover:border-primary-400"></div>
        <p className="text-textgray text-lg pl-2 group-hover:text-primary-400">
          Add a new subtask
        </p>
      </div>
    </div>
  );
}

function SubTaskItem({ subtask }) {
  const [value, setValue] = useState(subtask.title);
  const divRef = useRef(null);
  useEffect(() => {
    setValue(subtask.title);
  }, [subtask]);
  function handleInputFocus() {
    divRef.current.classList.add("ring-2", "ring-primary-400", "ring-offset-0");
  }
  function handleSubtaskChecked() {
    db.subtodo.update(subtask.id, { checked: !subtask.checked });
    divRef.current.classList.add("bg-backgroundL2");
  }
  function handleInputBlur() {
    divRef.current.classList.remove(
      "ring-2",
      "ring-primary-400",
      "ring-offset-0"
    );
    db.subtodo.update(subtask.id, { title: value });
  }
  function handleDeleteSubtask() {
    db.subtodo.delete(subtask.id);
  }
  return (
    <div
      className="flex items-center p-2 w-full rounded-md hover:bg-backgroundL2 transition duration-300"
      ref={divRef}
    >
      <Checkbox checked={subtask.checked} onChange={handleSubtaskChecked} />
      <input
        className={`${
          subtask.checked
            ? "line-through decoration-2 decoration-slate-100 text-textgray"
            : ""
        } w-full outline-none appearance-none text-text text-lg pl-1 bg-transparent`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
      <AnimatedIcon
        animateCondition={subtask.checked}
        className="ml-auto pr-2 text-textgray text-base hover:text-primary-400"
        onClick={handleDeleteSubtask}
      >
        <MdCancel size={18.5} />
      </AnimatedIcon>
    </div>
  );
}
