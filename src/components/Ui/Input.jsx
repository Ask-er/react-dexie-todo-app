import { CiViewList } from "react-icons/ci";
import { FaArrowUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  DropdownWrapper,
  DropdownHeader,
  DropdownItemButton,
} from "./Dropdown";
import db from "../../db/db";
import { useLiveQuery } from "dexie-react-hooks";

export function InputField({ handleTrack, currentList }) {
  const [val, setVal] = useState("");
  const [activeList, setActiveList] = useState(currentList);
  const lists = useLiveQuery(() => db.lists.toArray());
  useEffect(() => {
    async function fetchData() {
      const lists = await db.lists.toArray();
      if (!currentList && lists) {
        setActiveList(lists[0]?.title);
      } else {
        setActiveList(currentList);
      }
    }
    fetchData();
  }, [currentList]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTrack(val, activeList);
      setVal("");
    }
  };

  return (
    <div
      className="h-12 flex flex-row items-center mx-1 
        rounded-lg shadow-lg 
        bg-white dark:bg-backgroundL2 px-2 ring-1 ring-gray-400 hover:ring-primary-400"
    >
      <DropdownWrapper
        position={"top"}
        height={60}
        weight={60}
        icon={
          <CiViewList
            size={24}
            className="text-gray-400 cursor-pointer hover:text-primary-400"
          />
        }
      >
        <DropdownHeader>
          <CiViewList className="mr-2" size={24} /> <span>MyLists</span>
        </DropdownHeader>
        {lists?.map((list, key) => (
          <DropdownItemButton
            key={key}
            active={activeList === list.title}
            onClick={() => setActiveList(list.title)}
          >
            <h6>{list.title}</h6>
          </DropdownItemButton>
        ))}
      </DropdownWrapper>

      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter message..."
        className="bg-transparent ml-4 w-full text-text outline-none"
      />
      <FaArrowUp
        size={16}
        className=" text-gray-400 hover:text-primary-400 mr-2"
        onClick={handleTrack}
      />
    </div>
  );
}

export function InputPlaceholder({ todo }) {
  const [inputNoteValue, setInputNoteValue] = useState(todo?.notes);
  const handleUpdateNote = async () => {
    if (todo) {
      await db.todos.update(todo.id, { notes: inputNoteValue });
    }
  };
  useEffect(() => {
    setInputNoteValue(todo?.notes);
  }, [todo]);
  return (
    <div>
      <input
        type="text"
        placeholder={!todo?.notes ? "Insert your notes here" : todo?.notes}
        value={inputNoteValue}
        onChange={(e) => setInputNoteValue(e.target.value)}
        onFocus={() => setInputNoteValue(todo?.notes)}
        onBlur={handleUpdateNote}
        className="bg-transparent w-full pt-2 mb-4 focus:outline-none text-xl text-gray-600 placeholder:text-gray-600 ml-8"
      />
    </div>
  );
}
