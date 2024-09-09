import logo from "/todo-logo.svg";
import { BsGear } from "react-icons/bs";
import { CiCircleChevLeft, CiViewList, CiCalendar } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { GoGoal as Myday } from "react-icons/go";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import useModal from "../hooks/useModal";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../db/db";
import AddListModal from "./Modals/AddListModal";
const Week = () => (
  <div className="relative flex items-center justify-center">
    <CiCalendar size="28" />
    <span className="absolute top-3 text-[0.7rem]">7</span>
  </div>
);
export default function Sidebar() {
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [isShowingModal, toggleModal] = useModal();
  const lists = useLiveQuery(() => db.lists.toArray());
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleOpenAddListModal = () => {
    toggleModal();
  };
  async function handleDeleteList(id) {
    const result = await db.todos.where("listId").equals(id).delete();
    await db.lists.delete(id);

    console.log(result);
  }
  return (
    <>
      <AddListModal show={isShowingModal} onCloseButtonClick={toggleModal} />
      <div className="sidebar">
        <div className="pl-4 flex items-center">
          <i className="sidebar-icon">
            <img src={logo} alt="home" />
          </i>
          <h1 className="">Daily/Todo</h1>
        </div>

        <SideBarItem icon={<Myday size="24" />} title="My Day" link="/myday" />
        <SideBarItem
          icon={<Week size="28" />}
          title="Next 7 days"
          link="/tasks/next-7-days"
        />
        <div className="flex flex-col pl-4">
          <div className="flex items-center">
            <SideBarIcon icon={<CiViewList size="28" />} />
            <h1 className="sidebar-title text-textgray">My lists</h1>
            <div className="ml-auto mr-2 cursor-pointer flex gap-1">
              <FiPlus
                size="24"
                onClick={handleOpenAddListModal}
                className="hover:text-primary-300"
              />
              <CiCircleChevLeft
                size="24"
                className={`transition-transform duration-500 ${
                  dropdownOpen ? "transform -rotate-90" : "rotate-0"
                } hover:text-primary-300`}
                onClick={toggleDropdown}
              />
            </div>
          </div>
          {dropdownOpen && (
            <div className="flex flex-col mt-2 gap-2">
              {lists?.map((list, key) => (
                <div
                  key={key}
                  className="group flex text-textgray text-lg pl-6 mr-6 rounded-md hover:bg-backgroundL1 transition duration-200 transform hover:scale-105 animate-slideIn"
                >
                  <NavLink
                    to={`/tasks/lists/${list.title}`}
                    className="w-full hover:text-primary-400"
                  >
                    {list.title}
                  </NavLink>
                  <button
                    onClick={() => handleDeleteList(list.id)}
                    className="hidden group-hover:block ml-auto pr-2 text-base hover:text-primary-400"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <span className="flex-1"></span>
        <Divider />
        <div className="sidebar-item">
          <SideBarIcon icon={<BsGear size="28" />} />
          <h1 className="sidebar-title">Setting</h1>
        </div>
      </div>
    </>
  );
}
const SideBarItem = ({ icon, title, link }) => (
  <NavLink to={link} className="sidebar-item">
    <SideBarIcon icon={icon} />
    <h1 className={"sidebar-title"}>{title}</h1>
  </NavLink>
);
const SideBarIcon = ({ icon }) => (
  <div className="sidebar-icon">
    {icon} {/* This is where the icon prop is used */}
  </div>
);
const Divider = () => <hr className="sidebar-hr" />;
/* ({ isActive }) => (isActive ? "" : "") */
