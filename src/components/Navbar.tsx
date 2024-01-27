import { Link } from "react-router-dom";
import {
  useLogOutMutation,
} from "../redux/features/user/userApi";
import { useAppSelector } from "../redux/hook";

const Navbar = () => {
    
  const [logOut] = useLogOutMutation();

  
  const { user } = useAppSelector((state) => state.user);

  
  const handleLogout = async () => {
    await logOut(undefined);
  };

  return (
    <div className="h-[60px] shadow-md flex justify-end items-center px-10">
      {user.email ? (
        <div className="">
          <Link
            className="hover:bg-green px-3 py-1 rounded-md hover:text-white transition-all ease-in"
            to="login"
            onClick={() => handleLogout()}
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="flex">
          <div className="">
            <Link
              className="hover:bg-green px-3 py-1 rounded-md hover:text-white transition-all ease-in"
              to="login"
            >
              Login
            </Link>
          </div>
          <div className="">
            <Link
              className="hover:bg-green px-3 py-1 rounded-md hover:text-white transition-all ease-in"
              to="signup"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
