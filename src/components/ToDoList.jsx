import { useState } from "react";
import moment from "moment";
import ToDoCard from "./ToDoCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ToDoList = () => {
  const [startDate, setStartDate] = useState(0);
  const currentDate = moment().startOf("day");

  // Function to get the next 7 days based on the start date

  const getNext7Days = (start) => {
    return Array.from({ length: 7 }, (_, i) => moment(start).add(i, "days"));
  };
  const days = getNext7Days(currentDate);

  const handleLeftClick = () => {
    if (startDate > 0) {
      setStartDate(startDate - 1);
    }
  };

  const handleRightClick = () => {
    if (startDate < 6) {
      setStartDate((startDate) => startDate + 1);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="flex justify-between items-center w-full my-10 px-4 gap-1 lg:gap-4">
        <FaChevronLeft
          size="24"
          className={`cursor-pointer text-gray-500 hover:text-gray-400 transition-colors ${
            startDate > 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleLeftClick}
        />
        <div className="flex w-full overflow-hidden">
          {days.map((day, index) => {
            if (index >= startDate && index <= 6) {
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-1/2 px-2 md2:w-1/3 xl:w-1/4"
                >
                  <ToDoCard date={day} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <FaChevronRight
          size="24"
          className={`cursor-pointer text-gray-500 hover:text-gray-400 transition-colors `}
          onClick={handleRightClick}
        />
      </div>
    </div>
  );
};

export default ToDoList;
