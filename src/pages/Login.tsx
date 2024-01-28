/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/user/userApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setAccessToken } from "../redux/features/user/userSlice";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [userLogin, { isSuccess, error }] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user)


  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await userLogin(data).unwrap();
      // console.log(res);
      if (res?.data.accessToken) {
        localStorage.setItem("accessToken", res?.data?.accessToken);
        // console.log(res?.data?.accessToken);

        dispatch(setAccessToken(res?.data?.accessToken));
        // window.location.reload();
      }
      navigate("/");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (isSuccess) {
    toast("User Logged in succesfully!", {
      toastId: "login",
    });
  }

  if (error) {
    toast((error as any)?.data.message, {
      toastId: "login-error",
    });
  }

  if(user?.email) {
    navigate("/")
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen mx-auto">
      <div className="bg-white p-4 md:p-8 rounded shadow-md w-[80%] md:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-green">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green text-white p-2 rounded-md hover:bg-greener focus:outline-none focus:bg-green"
          >
            Login
          </button>
        </form>
      </div>
      <div className="mt-5">
        Not an account?{" "}
        <Link className="font-bold text-green" to="/signup">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
