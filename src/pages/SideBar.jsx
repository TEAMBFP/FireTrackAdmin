// eslint-disable-next-line no-unused-vars
import React from "react";
import { Outlet } from "react-router-dom";
import apiService from "../api";

export default function SideBar() {
    const handleLogout = async () => {
        try {
            await apiService.get('/logout');
            localStorage.removeItem('token');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    
    }
  return (
    <>
      <div id="sidebar">          
        
        <nav>
          <ul>
            <li>
              <a href={`/incidents`}>Incident</a>
            </li>
          </ul>
        </nav>
        <div>
            <a  onClick={handleLogout} style={{cursor:'pointer'}}>Logout</a>
        </div>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
