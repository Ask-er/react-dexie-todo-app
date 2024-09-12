import { useEffect, useRef } from "react";
export default function AnimatedIcon({
  children,
  onClick,
  className,
  animateCondition,
}) {
  const iconRef = useRef(null);
  useEffect(() => {
    if (iconRef.current) {
      if (!animateCondition) {
        iconRef.current.style.display = "block";
        iconRef.current.classList.add("animate-slideOutToRight");
        iconRef.current.onanimationend = () => {
          iconRef.current.style.display = "none";
          iconRef.current.classList.remove("animate-slideOutToRight");
        };
      } else {
        iconRef.current.style.display = "block";
        iconRef.current.classList.add("animate-slideInFromRight");
        iconRef.current.onanimationend = () => {
          iconRef.current.classList.remove("animate-slideInFromRight");
        };
      }
    }
  }, [animateCondition]);

  if (animateCondition === undefined) iconRef.current.style.display = "block";
  return (
    <div
      ref={iconRef}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}
