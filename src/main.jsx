import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SideBar from './pages/SideBar';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Incidents from './pages/Incidents';

const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <SideBar/>,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "/incidents",
        element: <Incidents />,
      },
    ],
  },
  
]);

const publicRoute = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement:<ErrorPage/>,
  },
  {
    path: "/register",
    element: <Register/>,
    errorElement:<ErrorPage/>,
  }
  
]);

const auth = localStorage.getItem('token');



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={auth ?privateRoutes:publicRoute} />
  </React.StrictMode>,
)
