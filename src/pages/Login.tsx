/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/user/userApi";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [userLogin] = useLoginUserMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // console.log("data", data);
      const res = await userLogin(data).unwrap();

      console.log(res);
      navigate('/');
      // if (res?.accessToken) {
      //   // router.push("/");
      //   // message.success("User logged in successfully!");
      //   console.log("log success");
      // }
      // storeUserInfo({ accessToken: res?.accessToken });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen mx-auto">
      <div className="bg-white p-4 md:p-8 rounded shadow-md w-[80%] md:w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

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
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
      <div className="mt-5">
        Not an account?{" "}
        <Link className="font-bold text-deep" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
