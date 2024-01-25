import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
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
  );
};

export default MainLayout;
