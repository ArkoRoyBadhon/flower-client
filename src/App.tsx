import { useNavigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { useGetUserQuery } from "./redux/features/user/userApi";
import { setLoggedInfo } from "./redux/features/user/userSlice";
import { useAppDispatch } from "./redux/hook";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const query = useGetUserQuery(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query.isSuccess) {
      dispatch(setLoggedInfo(query.data?.data));
    }
    if (query.isError) {
      dispatch(setLoggedInfo(null));
      navigate("/login");
    }
  }, [query.isSuccess, query.isError, query.data, dispatch, navigate]);

  return (
    <>
      <ToastContainer />
      <MainLayout />
    </>
  );
}

export default App;
