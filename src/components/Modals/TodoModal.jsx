import ToDoDetail from "../ToDoDetail";
import Modal from "../Ui/Modal";
import { IoRemoveOutline } from "react-icons/io5";
export default function TodoModal({
  show,
  onCloseButtonClick,
  todo,
  listTitle,
}) {
  return (
    <Modal
      show={show}
      onCloseButtonClick={onCloseButtonClick}
      className="w-1/2 h-1/2"
    >
      <div className="bg-backgroundL1 py-5 pl-12 pr-14 rounded shadow-lg w-full relative">
        <ToDoDetail todo={todo} listTitle={listTitle} />
        <IoRemoveOutline
          onClick={onCloseButtonClick}
          size={24}
          className="absolute top-5 right-4 text-text hover:text-primary-400"
        />
      </div>
    </Modal>
  );
}
