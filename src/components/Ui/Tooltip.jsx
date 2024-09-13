import { useRef } from "react";

export default function Tooltip({ message, children, className }) {
  const tooltipRef = useRef(null);
  const container = useRef(null);

  return (
    <div
      ref={container}
      onMouseEnter={() => {
        if (!tooltipRef.current || !container.current) return;
        const { left, right, top } = container.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate the distance to the left and right edges of the viewport

        const distanceToRightEdge = viewportWidth - right;
        const distanceToTopEdge = top;

        // Adjust the tooltip position based on the calculated distance
        if (left > viewportWidth / 2) {
          // If the element is closer to the right edge
          if (tooltipRef.current.offsetWidth / 2 > distanceToRightEdge) {
            // If the tooltip center is wider than the distance to the right edge
            tooltipRef.current.style.left = "auto";
            tooltipRef.current.style.right =
              "-" + tooltipRef.current.offsetWidth / 5 + "px";
          } else {
            tooltipRef.current.style.left = "auto";
            tooltipRef.current.style.right =
              "-" + distanceToRightEdge / 2 + "px";
          }
        } else {
          //if the element is closer to the left edge
          tooltipRef.current.style.left = 10 + "px";
          tooltipRef.current.style.right = "auto";
        }
        if (distanceToTopEdge > viewportHeight / 2) {
          // if element closer to the bottom
          tooltipRef.current.style.top = "auto";
          tooltipRef.current.style.bottom = "100%";
        } else {
          tooltipRef.current.style.top = "100%";
          tooltipRef.current.style.bottom = "auto";
        }
      }}
      className={`group relative inline-block ${className}`}
    >
      {children}
      {message ? (
        <span
          ref={tooltipRef}
          className="invisible text-sm group-hover:visible opacity-0 group-hover:opacity-100 transition bg-blue-500 text-white p-1 rounded absolute top-full mt-2 whitespace-nowrap"
        >
          {message}
        </span>
      ) : null}
    </div>
  );
}
