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
import UpdateIncident from './pages/UpdateIncident';
import ProfileSideBar from './component/ProfileSideBar';
import AccounInfo from './pages/AccountInfo';
import ChangePass from './pages/ChangePass';
import Firestations from './pages/Firestations';
import FireType from './pages/FireType';
import FireStatus from './pages/FireStatus';
import GlobalVariablesProvider from './GlobalState/GlobalVariables';
import District from './pages/District';
import DataVisualization from './pages/DataVisualization';
import RegisterAdditionalInfo from './pages/RegisterAdditionalInfo';
import Employees from './pages/Employees';
import UserTypes from './pages/UserTypes';
import ForgotPasswordForm from './pages/ForgotPasswordForm';
import Region from './pages/Region';
import Barangay from './pages/Barangay';

const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <SideBar/>,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Incidents />,
      },
      {
        path: "/update-incident",
        element: <UpdateIncident />,
      },
      {
        path:"account",
        element:<ProfileSideBar/>,
        children:[
          {
            path:"",
            element:<AccounInfo/>,
          },
          {
            path:"change-password",
            element:<ChangePass/>,
          }
        ]
      },
      {
        path:'/stations',
        element: <Firestations/>
      },
      {
        path:'/fire-type',
        element: <FireType/>
      },
      {
        path:'/fire-status',
        element: <FireStatus/>
      },
      {
        path: "/district",
        element:<District/>
      },
      {
        path: "/data-visualization",
        element: <DataVisualization/>
      },
      {
        path: "/employees",
        element:<Employees/>
      },
      {
        path: '/user-types',
        element: <UserTypes/>
      },
      {
        path: '/region',
        element: <Region/>
      },
      {
        path: '/barangay',
        element: <Barangay/>
      }
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
  },
  {
    path: '/register/additional_info',
    element:<RegisterAdditionalInfo/>,
    errorElement:<ErrorPage/>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordForm/>
  }
  
]);

const auth = localStorage.getItem('token');



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <GlobalVariablesProvider>
          <RouterProvider router={auth ?privateRoutes:publicRoute} />
        </GlobalVariablesProvider>
  </React.StrictMode>,
)
