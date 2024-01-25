import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoFlowerOutline } from "react-icons/io5";
import { MdOutlineCrisisAlert } from "react-icons/md";
import { LuHistory } from "react-icons/lu";

const Sidebar = () => {
  const [isFVisible, setFVisible] = useState(false);

  const toggleSubMenu = (sub: string) => {
    if (sub === "flower") setFVisible(!isFVisible);
  };

  return (
    <div className="p-5 w-full">
      <div className="mb-6">
        <Link to="/" className="text-xl font-bold text-orange">
          Flower Shop
        </Link>
      </div>
      <div className={`flex flex-col`}>
        <div className="inline-block outline outline-b-1 outline-white h-fit ">
          <div
            className=" w-full  px-4 py-2 cursor-pointer flex justify-between items-center hover:bg-gray-200"
            onClick={() => toggleSubMenu("flower")}
          >
            <div className="flex items-center gap-2">
              <IoFlowerOutline />
              <span>Flower Management</span>
            </div>
            <span
              className={`space-x-2 ${
                isFVisible ? "rotate-90" : ""
              } transition-transform duration-300 ease-in-out`}
            >
              <IoIosArrowForward />
            </span>
          </div>
          <div className="relative overflow-hidden">
            <div
              className={` ${
                isFVisible ? "h-0" : "h-20"
              } transition-all ease-in bg-light`}
            >
              <div
                className={`absolute w-full transition-all ease-in ${
                  isFVisible ? "top-[-100px]" : "top-0 md:top-0"
                }`}
              >
                <Link
                  to="/add-flower"
                  className="px-4 py-2 w-full hover:bg-gray-200 transition-all ease-in inline-block text-center"
                >
                  Add Flower
                </Link>
                <Link
                  to="/flower-manage"
                  className="px-4 py-2 w-full hover:bg-gray-200 transition-all ease-in inline-block text-center"
                >
                  Manage Flower {/* create, delete, **make admin, */}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Link
          to="sale-manage"
          className="inline-block text-left outline outline-b-1 outline-white h-fit hover:bg-gray-200"
        >
          <div className=" w-full  px-4 py-2 cursor-pointer flex items-center gap-2">
            <MdOutlineCrisisAlert />
            <span>Sales Management</span>
          </div>
        </Link>
        <Link
          to="/sale-history"
          className="inline-block outline outline-b-1 outline-white h-fit hover:bg-gray-200"
        >
          <div className=" w-full  px-4 py-2 cursor-pointer flex items-center gap-2">
            <LuHistory />
            <span>Sales History</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
