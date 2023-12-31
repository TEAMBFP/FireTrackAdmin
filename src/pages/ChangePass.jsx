import React from 'react'
import apiService from '../api';

const ChangePass = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [password, setPassword] = React.useState('');
    const [confirm_password, setConfirmPassword] = React.useState('');

   const handleChangePassword = async () => { 
        if(password !== confirm_password){
            setPassword('');
            setConfirmPassword('');
            return alert('Password does not match')
        }
        const payload = { 
            password, 
            id:user.id, 
        };

        await apiService.post('/change-pass', payload );
        setPassword('');
        setConfirmPassword('');
        return alert('Password changed successfully');
    }
  return (
    <div style={{display:'flex', flexDirection:'column', rowGap:'13px', padding:'42px'}}>
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