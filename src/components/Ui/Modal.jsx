import { createPortal } from "react-dom";
import { useRef } from "react";

export default function Modal({ show, onCloseButtonClick, children }) {
  const dialogRef = useRef(null);
  if (!show) {
    return null;
  }

  const handleBackdropClick = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      onCloseButtonClick();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        className="bg-backgroundL1 p-4 rounded shadow-lg w-1/3"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
