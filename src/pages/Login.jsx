import  { useState } from 'react';
import apiService from '../api';
import { useNavigate } from 'react-router-dom';
import BFP from '../assets/BFP.png';
import USTP from '../assets/USTP.png';
import FT from '../assets/FT.png';
import bg1 from '../assets/bg2.png';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const styles = {
        background: `url(${bg1}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        height: '200vh',  // Adjust the height as needed
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'100vw' 
        
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your login logic here
        try {
            setLoading(true);
            const res = await apiService.post('/admin-login', { email, password },{
            'Accept': 'application/json',
            })

            localStorage.setItem('token', res?.data?.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            if(!res?.data?.token){
                console.log('no token');
                navigate('/register/additional_info');
            }else{
                window.location.href = '/';
            }
           
            
             setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
             setLoading(false);
        }
        
    };
    return (
        <div style={styles}>
            <div>
            <form style={{ width: '900px', padding: '20px 50px 20px 50px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor:'white' }} onSubmit={handleSubmit}>
                <div style={{marginTop: '-20px', height:'450px',backgroundColor:'#FDCE91', width:'300px', padding: '20px 50px 20px 50px',marginLeft:'-50px',borderRadius: '5px'  }}>
                    <div>
                        <img src={USTP} alt="logo" style={{width:'150px', height:'150px', marginLeft:'30px'}} />
                    </div>
                    <div>
                    <img src={BFP} alt="logo" style={{width:'130px', height:'130px', marginLeft:'30px', marginTop:'20px'}} />
                    </div>
                    <div>
                    <img src={FT} alt="logo" style={{width:'260px', height:'260px', marginLeft:'-30px', marginTop:'-60px'}} />
                    </div>
                </div>
                <div style={{ width: '520px', marginTop:'-421px', marginLeft:'295px', padding: '20px 50px 20px 50px', borderRadius: '5px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign in</h2>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} style={{ width: '100%', padding: '5px',borderBottom:'1px solid black'    }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} style={{ width: '100%', padding: '5px', borderBottom:'1px solid black' }} />
                </div>
                <div>
                    {error && <p style={{ color: 'red', fontSize:'0.80rem' }}>{error}</p>}
                </div>
                <button 
                    type="submit" 
                    style={{ width: '100%', padding: '10px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px', marginTop:'7px' }}
                    onClick={handleSubmit}
                >
                    {loading?'Loading...':'Login'}
                </button>
                <div>
                    <p style={{ textAlign: 'center' }}>Don&apos;t have an account? <a href="/register">Register</a></p>
                </div>
                 <div>
                    <p style={{ textAlign: 'center' }}> <a href="/forgot-password">Forgot password?</a></p>
                </div>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Login;
