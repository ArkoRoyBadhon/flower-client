import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            Layout
            <div className="">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;