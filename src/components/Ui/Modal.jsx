import { createPortal } from "react-dom";
import { useRef, useEffect, useState } from "react";

export default function Modal({
  show,
  onCloseButtonClick,
  children,
  className, // default delay for hiding animation
}) {
  const [modalShow, setModalShow] = useState(show);
  const divRef = useRef();
  useEffect(() => {
    if (modalShow) {
      const animation = divRef.current.animate(
        [
          {
            transform: "translateX(0px) skewX(0deg) scaleX(1)",
          },
          {
            transform: "translateX(-30px) skewX(-5deg) scaleX(.9)",
            offset: 0.3,
          },
          {
            transform: "translateX(1500px) skewX(30deg) scaleX(1.3)",
          },
        ],
        {
          duration: 500,
          fill: "forwards",
          easing: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
        }
      );
      animation.onfinish = () => {
        setModalShow(false);
      };
    } else {
      setModalShow(show);
    }
  }, [show]);
  if (!modalShow) {
    return null;
  }
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onCloseButtonClick();
    }
  };

  return createPortal(
    <div
      className="modal-backdrop fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div ref={divRef} className={`${className} animate-roadRunnerIn`}>
        {children}
      </div>
    </div>,
    document.body
  );
}
