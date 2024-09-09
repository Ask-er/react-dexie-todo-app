import { useState, useRef, useEffect } from "react";
import { CiCircleCheck } from "react-icons/ci";

export const DropdownIcon = ({ children, onClick }) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
};

export const DropdownItem = ({ children, onClick }) => {
  return (
    <li onClick={onClick} className="dropdown-item">
      {children}
    </li>
  );
};
export const DropdownItemButton = ({ children, onClick, active }) => {
  return (
    <li onClick={onClick} className="dropdown-item-button">
      {children}
      {active && (
        <CiCircleCheck
          size={20}
          className="ml-auto bg-green-500 rounded-full"
        />
      )}
    </li>
  );
};
export const DropdownHeader = ({ children }) => {
  return <li className="dropdown-header">{children}</li>;
};

export const DropdownList = ({
  children,
  position,
  height = "auto",
  weight,
}) => {
  const positionClasses = { top: "bottom-11" };
  const heightClasses = {
    auto: "h-auto",
    60: "h-60",
    80: "h-80",
  };
  const weightClasses = {
    40: "w-40",
    60: "w-60",
    80: "w-80",
  };
  return (
    <ul
      className={`dropdown ${positionClasses[position]} ${heightClasses[height]} ${weightClasses[weight]} shadow-lg`}
    >
      {children}
    </ul>
  );
};

export const DropdownWrapper = ({
  icon,
  children,
  position,
  height,
  weight,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div onClick={handleToggleDropdown}>{icon}</div>
      {showDropdown && (
        <DropdownList position={position} height={height} weight={weight}>
          {children}
        </DropdownList>
      )}
    </div>
  );
};
