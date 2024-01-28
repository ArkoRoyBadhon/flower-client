/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateUserMutation } from "../redux/features/user/userApi";
import { toast } from "react-toastify";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [createUser, { isSuccess, error }] = useCreateUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // console.log("data", data);
      await createUser(data).unwrap();

      navigate("/login");
      reset();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (isSuccess) {
    toast("User Register succesfully!", {
      toastId: "register",
    });
  }

  if (error) {
    toast((error as any)?.data.message, {
      toastId: "register-error",
    });
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen mx-auto">
      <div className="bg-white p-4 md:p-8 rounded shadow-md w-[80%] md:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-green">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
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

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green text-white p-2 rounded-md hover:bg-greener focus:outline-none focus:bg-green"
          >
            Register
          </button>
        </form>
      </div>
      <div className="mt-5">
        Already have an account?{" "}
        <Link className="font-bold text-green" to="/login">
          Login
        </Link>
      </div>
      <div className="mt-5 text-center text-orange text-[20px]">
        <p>This is for normal user Registration</p>
        <p>This Registration do not grant you to management functionalitites</p>
        <p>Only admin can access.</p>
      </div>
    </div>
  );
};

export default Signup;
