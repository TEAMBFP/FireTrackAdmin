// eslint-disable-next-line no-unused-vars
import React from "react";
import { Outlet } from "react-router-dom";
import apiService from "../api";
import logo from '/1.png?url'
import { useNavigate } from 'react-router-dom';
export default function ProfileSideBar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
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
    <div style={{height:'100%', paddingBottom:'55px'}}>
        <h1 style={{color:'orange'}}>
            User profile
       </h1>
       <div style={{display:'flex', height:'80%', border:'1px solid #F0F0F0'}}>
            <div  style={{display:'flex', flexDirection:'column', width:'18rem', height:'auto', }}>
                <div onClick={()=>navigate('/account')} 
                    style={{
                        padding:'12px', 
                        cursor:'pointer', 
                        width:'100%',
                        display:'flex',
                        justifyContent:'center',
                        backgroundColor:location.pathname.includes('change-password')?'white':'#DBDBDB',
                    }}
                    className="hoverable-div"
                >
                    Info
                </div>
                <div onClick={()=>navigate('/account/change-password')} 
                    style={{
                        padding:'12px', 
                        cursor:'pointer', 
                        width:'100%',
                        display:'flex',
                        justifyContent:'center',
                        backgroundColor:!location.pathname.includes('change-password')?'white':'#DBDBDB',

                    }}
                    className="hoverable-div"
                >
                    Change password
                </div>
           
            </div>
            <div style={{backgroundColor:'#F0F0F0', width:'100%'}}>
                <Outlet />
            </div>
        </div>
    </div>
  );
}
