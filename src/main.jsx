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
