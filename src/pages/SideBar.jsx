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
                <a onClick={()=>navigate('stations')}>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"  width={28} height={28}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                  </svg>
                    {isSidebarOpen ? 'Stations' : ''}
                </a>
                 <a onClick={()=>navigate('fire-type')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"  width={28} height={28}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                  </svg>

                    {isSidebarOpen ? 'Fire type' : ''}
                </a>
                <a onClick={()=>navigate('fire-status')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" width={28} height={28}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>

                    {isSidebarOpen ? 'Status' : ''}
                </a>
                 <a onClick={()=>navigate('account')}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" width={28} height={28}>
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
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
