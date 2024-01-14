import React from 'react'
import apiService from '../api';

const ChangePass = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [password, setPassword] = React.useState('');
    const [confirm_password, setConfirmPassword] = React.useState('');
    const [current_password, setCurrentPassword] = React.useState('');
    const [error, setError] = React.useState(null);

   const handleChangePassword = async () => { 
        if(password !== confirm_password){
            setPassword('');
            setConfirmPassword('');
            return alert('Password does not match')
        }
        const payload = { 
            password, 
            current_password,
            id:user.id, 
        };

        try {
             await apiService.post('/change-pass', payload );
             alert('Password changed successfully');
             setError(null);
        } catch (error) {
            if (error.response.data.msg) {
                setError(error.response.data.msg);
            }
            console.log(error.response);
            
        }
       
        setPassword('');
        setConfirmPassword('');
        setCurrentPassword('');
        
    }
  return (
    <div style={{display:'flex', flexDirection:'column', rowGap:'13px', padding:'42px'}}>
        Current password
        <input
            value={current_password}
            type='password'
            onChange={(e)=>setCurrentPassword(e.target.value)}
        />
        New password
        <input
            value={password}
            type='password'
            onChange={(e)=>setPassword(e.target.value)}
        />
        Confirm new password
        <input
            value={confirm_password}
            type='password'
            onChange={(e)=>setConfirmPassword(e.target.value)}
        />
        {error && <p style={{color:'red'}}>{error}</p>}
        <button
            style={{marginTop:'22px', width:'50%'}}
            onClick={handleChangePassword}
        >
            Change password
        </button>
        
    </div>
  )
}

export default ChangePass