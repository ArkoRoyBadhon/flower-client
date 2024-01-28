import { Link } from "react-router-dom";
import { useLogOutMutation } from "../redux/features/user/userApi";
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
        <div className="w-full flex justify-between md:justify-end">
          <div className="md:hidden">
            <Link to="/" className="text-xl ml-5  font-bold text-orange">
              Flower Shop
            </Link>
          </div>
          <Link
            className="hover:bg-green px-3 py-1 rounded-md hover:text-white transition-all ease-in font-bold border"
            to="login"
            onClick={() => handleLogout()}
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="w-full flex justify-end">
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
