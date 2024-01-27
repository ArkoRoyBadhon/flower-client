import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';
import AddFlower from '../pages/AddFlower';
import ViewFlower from '../pages/ViewFlower';
import SaleManage from '../pages/SaleManage';
import SaleHistory from '../pages/SaleHistory';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/add-flower",
        element: <AddFlower />,
      },
      {
        path: "/flower-manage",
        element: <ViewFlower />,
      },
      {
        path: "/sale-manage",
        element: <SaleManage />,
      },
      {
        path: "/sale-history",
        element: <SaleHistory />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
  
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
