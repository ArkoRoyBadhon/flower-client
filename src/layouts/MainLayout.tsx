import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import { IoArrowForwardCircle } from "react-icons/io5";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation()
  const currentRoute: string = location.pathname;
  useEffect(()=>{
    setMobileMenu(false)
  },[currentRoute])
  return (
    <div className="relative overflow-hidden">
      <div className="hidden md:block">
        <div className="flex">
          <div className=" md:w-[20%] h-fit">
            <Sidebar />
          </div>
          <div className=" m-0 p-0 border-l"></div>
          <div className=" w-[80%] min-h-[100vh]">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <div
          onClick={() => setMobileMenu(!mobileMenu)}
          className="absolute top-3 left-3"
        >
          <IoArrowForwardCircle size={35} />
        </div>
        <div
          className={`absolute z-10 w-[80vw] h-[100vh] bg-gray-200 transition-all ease-in top-0 ${
            mobileMenu ? "left-0" : "left-[-500px]"
          }`}
        >
          <div className="flex justify-end">
            <div
              className="bg-green w-fit px-3 py-1 text-white hover:bg-greener"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              close
            </div>
          </div>
          <div className="mt-5">
            <Sidebar  />
          </div>
        </div>
        <div className=" w-[100%] min-h-[100vh]">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
