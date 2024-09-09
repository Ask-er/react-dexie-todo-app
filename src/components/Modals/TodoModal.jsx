import { createPortal } from "react-dom";

export default function TodoModal({ show, onCloseButtonClick }) {
  if (!show) {
    return null;
  }
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl mb-4">Todo Details</h2>
        <p>Title: </p>
        <p>List: </p>
        <button
          onClick={onCloseButtonClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}
