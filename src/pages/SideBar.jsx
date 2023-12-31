// eslint-disable-next-line no-unused-vars
import React from "react";
import { Outlet } from "react-router-dom";
import apiService from "../api";
import logo from '/1.png?url'
import { useNavigate } from 'react-router-dom';
export default function SideBar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
    const handleLogout = async () => {
        try {
            await apiService.get('/logout');
            localStorage.removeItem('token');
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    
    }
    
  return (
    <>
       
      <div id="sidebar" className={isSidebarOpen ? 'open' : 'closed'}>          
       <div onClick={() => setSidebarOpen(!isSidebarOpen)} style={{backgroundColor:'transparent', cursor:'pointer'}}>
        {isSidebarOpen ? 'Collapse' : 'Expand'}
      </div>

          <img className={isSidebarOpen ? 'large' : 'small'} src={logo} />
        <nav>
          <ul>
            <li>
                <a onClick={()=>navigate('/')}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 20" width={28} height={28}>
                      <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z"/>
                    </svg>
                    {isSidebarOpen ? 'Incidents' : ''}
                </a>
                 <a onClick={()=>navigate('account')}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6" width={28} height={28}>
                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                  </svg>

                    {isSidebarOpen ? 'Account' : ''}
                </a>
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
