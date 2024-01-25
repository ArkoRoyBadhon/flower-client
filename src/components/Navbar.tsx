import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="h-[60px] shadow-md flex justify-end items-center px-10">
            <div className="">
                <Link className="hover:bg-green px-3 py-1 rounded-md hover:text-white transition-all ease-in" to="login">Login</Link>
            </div>
            <div className="">
                <Link className="hover:bg-green px-3 py-1 rounded-md hover:text-white transition-all ease-in"  to="signup">Register</Link>
            </div>
        </div>
    );
};

export default Navbar;