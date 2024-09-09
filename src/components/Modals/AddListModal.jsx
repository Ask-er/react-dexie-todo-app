import { addList } from "../../db/db";
import { useState } from "react";
import Modal from "../Ui/Modal";
export default function AddListModal({ show, onCloseButtonClick }) {
  const [inputValue, setInputValue] = useState("");
  async function handleAddList() {
    const listName = inputValue;
    if (listName.trim() === "") {
      return;
    }
    const capitalizedListName =
      listName.charAt(0).toUpperCase() + listName.slice(1).toLowerCase();
    const promise = await addList(capitalizedListName);
    onCloseButtonClick();
    console.log(promise);
  }
  return (
    <Modal show={show} onCloseButtonClick={onCloseButtonClick}>
      <div className="flex flex-col">
        <button
          onClick={onCloseButtonClick}
          className="ml-auto text-text text-lg hover:text-primary-400"
        >
          X
        </button>
        <input
          type="text"
          placeholder="List Name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-transparent w-full p-2 mb-4 focus:outline-none text-3xl text-text"
        />
        <button
          className="ml-auto bg-primary-500 text-white p-2 rounded-xl w-40"
          onClick={handleAddList}
        >
          Continue
        </button>
      </div>
    </Modal>
  );
}
