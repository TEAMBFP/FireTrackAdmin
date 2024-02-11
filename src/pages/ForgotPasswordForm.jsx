import React, {useState} from 'react'
import apiService from '../api';
import bg1 from '../assets/bg2.png';


const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState(1);
    const [pinCode, setPinCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const styles = {
        background: `url(${bg1}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        height: '200vh',  // Adjust the height as needed
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'100%'
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePinCodeChange = (e) => {
        setPinCode(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }


    const handleSendCode = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await apiService.post('/reset-pass', { email },{
            'Accept': 'application/json',
            })
            if(res.status === 200){
                setMode(2);
            }
            setLoading(false);
        } catch (error) {
             setError(error.response.data.message);
             setLoading(false);
        }
        
    }

    const handlePinCodeSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await apiService.post('/reset-code', { email, code:pinCode },{
            'Accept': 'application/json',
            })
            if(res.status === 200){
                setMode(3);
            }
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError('Password and confirm password must be the same');
            return;
        }
        try {
            setLoading(true);
            const res = await apiService.post('/reset-submit', 
                { email, code:pinCode, password,password_confirmation:confirmPassword},
                {'Accept': 'application/json',}
            )
            if(res.status === 200){
                window.location.href = '/';
            }
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
             setLoading(false);
        }
    }
  return (
    <div style={styles}>
            <div>
            <form 
                style={{backgroundColor:'white', width: '320px', padding: '20px 50px 20px 50px', border: '1px solid #ccc', borderRadius: '5px' }} 
                onSubmit={mode === 1 ? handleSendCode : mode === 2 ? handlePinCodeSubmit : handleChangePassword}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Forgot password</h2>
                {mode === 1 ? 
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={handleEmailChange} 
                            style={{ width: '100%', padding: '5px', border:'1px solid gray' }} 
                        />
                    </div>
               
                    :
                mode === 2 ? 
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="email">Pin code</label>
                        <input 
                            type="text" 
                            value={pinCode} 
                            onChange={handlePinCodeChange} 
                            style={{ width: '100%', padding: '5px', border:'1px solid gray' }} 
                        />
                    </div>
                :
                    <div style={{marginBottom: '10px'}}>
                        <label htmlFor="email">New Password</label>
                        <input 
                            type='password'
                            value={password} 
                            onChange={handlePasswordChange} 
                            style={{ width: '100%', padding: '5px', border:'1px solid gray' }} 
                        />
                        <label htmlFor="email">Confirm new password</label>
                        <input 
                            type="password" 
                            value={confirmPassword} 
                            onChange={handleConfirmPasswordChange} 
                            style={{ width: '100%', padding: '5px', border:'1px solid gray' }} 
                        />
                    </div>
               
                }
                <div>
                    {error && <p style={{ color: 'red', fontSize:'0.80rem' }}>{error}</p>}
                </div>
                <button 
                    type="submit" 
                    style={{ width: '100%', padding: '10px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px', marginTop:'7px' }}
                    onClick={mode === 1 ? handleSendCode : mode === 2 ? handlePinCodeSubmit : handleChangePassword}
                >
                    {loading?'Loading...': mode === 1 ? 'Send code' : mode === 2 ? 'Verify code' : 'Change password'}
                </button>
                 <div>
                    <p style={{ textAlign: 'center' }}> <a href="/register">Cancel</a></p>
                </div>
            </form>
            </div>
        </div>
  )
}

export default ForgotPasswordForm