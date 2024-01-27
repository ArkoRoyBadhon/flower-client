import { Link, useNavigate } from "react-router-dom";
import {
  useGetUserQuery,
  useLogOutMutation,
} from "../redux/features/user/userApi";
import { setLoggedInfo } from "../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

const Navbar = () => {
  const {
    data: InfoData,
    isSuccess,
    isError,
  } = useGetUserQuery(undefined);
  const [logOut] = useLogOutMutation();

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user);

  if (isSuccess) {
    dispatch(setLoggedInfo(InfoData?.data));
  }

  const handleLogout = async () => {
    await logOut(undefined);
  };

  if (isError) {
    dispatch(setLoggedInfo(null));
    navigate("/login");
  }

  return (
    <div className="h-[60px] shadow-md flex justify-end items-center px-10">
      {user.email ? (
        <div className="">
            <Link
              className="hover:bg-green px-3 py-1 rounded-md hover:text-white transition-all ease-in"
              to="login"
              onClick={()=> handleLogout()}
            >
              Logout
            </Link>
        </div>
      ) : (
        <div className="">
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
