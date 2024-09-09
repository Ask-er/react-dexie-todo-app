import { useRef } from "react";

export default function Tooltip({ message, children }) {
  const tooltipRef = useRef(null);
  const container = useRef(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left, right } = container.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        // Calculate the distance to the left and right edges of the viewport

        const distanceToRightEdge = viewportWidth - right;

        // Adjust the tooltip position based on the calculated distance
        if (distanceToRightEdge < tooltipRef.current.offsetWidth) {
          tooltipRef.current.style.left = "auto";
          tooltipRef.current.style.right = "-" + distanceToRightEdge / 2 + "px";
        } else {
          tooltipRef.current.style.left = clientX - left + "px";
          tooltipRef.current.style.right = "auto";
        }
      }}
      className="group relative inline-block"
    >
      {children}
      {message ? (
        <span
          ref={tooltipRef}
          className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-blue-500 text-white p-1 rounded absolute top-full mt-2 whitespace-nowrap"
        >
          {message}
        </span>
      ) : null}
    </div>
  );
}
