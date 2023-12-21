import  { useState } from 'react';
import apiService from '../api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { name, email, password, password_confirmation:confirm_password, type:'admin' };
        try {
            setLoading(true)
            const res = await apiService.post('/register', payload );
            if(res?.data){
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                window.location.href = '/';
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message)
        }

        // Handle form submission logic here
    };

    return (
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'100%' }}>
            <div>
            <form style={{ width: '320px', padding: '20px 50px 20px 50px', border: '1px solid #ccc', borderRadius: '5px' }} onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Name:</label>
                    <input  value={name} onChange={handleNameChange} style={{ width: '100%', padding: '5px', border:'1px solid gray' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} style={{ width: '100%', padding: '5px', border:'1px solid gray' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} style={{ width: '100%', padding: '5px', border:'1px solid gray' }} />
                </div>
                 <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="password">Confirm Password:</label>
                    <input type="password" id="password" value={confirm_password} onChange={handleConfirmPasswordChange} style={{ width: '100%', padding: '5px', border:'1px solid gray' }} />
                </div>
                <div>
                    {error && <p style={{ color: 'red', fontSize:'0.80rem' }}>{error}</p>}
                </div>
                <button 
                    type="submit" 
                    style={{ width: '100%', padding: '10px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px', marginTop:'7px' }}
                    disabled={loading}
                >
                    {loading?'Loading...':'Register'}
                </button>
                 <div>
                    <p style={{ textAlign: 'center' }}>Have an account? <a href="/">Login</a></p>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Register;
