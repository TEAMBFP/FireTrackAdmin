import  { useState } from 'react';
import apiService from '../api';
import Select from '../component/Select';
import bg1 from '../assets/bg2.png';


const Register = () => {
    const [name, setName] = useState({firstname:'', lastname:''});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [additional_details, setAdditionalDetails] = useState({
        phone_no:'',
        birthday:'',
        address:'',
        gender:'',
    });

    const styles = {
        background: `url(${bg1}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        height: '100vh',  // Adjust the height as needed
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '649px', width:'100%', marginTop:'-10px' 

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
        const payload = { 
                ...name, 
                email, 
                password, 
                password_confirmation:confirm_password,
                info: additional_details
        };
        try {
            setLoading(true)
            const res = await apiService.post('/admin-register', payload );
            if(res?.data){
                localStorage.setItem('user', JSON.stringify(res.data.user));
                setMessage('We have sent you an email to verify your account. Please check your email.')
              
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message)
        }

    };
    return (
       <div style={styles}>
            <div>
            <form style={{backgroundColor:'white',  padding: '20px 50px 20px 50px', border: '1px solid #ccc', borderRadius: '5px',marginTop:'15px' }} onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop:'-10px' }}>Register</h2>
                 <div style={{ marginBottom: '10px', display:'flex', justifyContent:'space-between' }}>
                    <div style={{width:'47%'}}>
                        <label> First Name:</label>
                        <input  
                            value={name.firstname} 
                            onChange={(e)=>setName({...name, firstname:e.target.value})}
                            style={{ width: '100%', padding: '5px', border:'1px solid gray' }} 
                            required
                        />
                    </div>
                     <div style={{width:'47%'}}>
                        <label> Last name:</label>
                        <input  
                            value={name.lastname} 
                            onChange={(e)=>setName({...name, lastname:e.target.value})} 
                            style={{ width: '100%', padding: '5px', border:'1px solid gray' }} 
                            required
                        />
                    </div>
                </div>
                <div style={{ marginBottom: '10px', display:'flex', justifyContent:'space-between' }}>
                    <div style={{width:'47%'}}>
                        <label> Phone no:</label>
                        <input
                            onChange={(e)=>
                                setAdditionalDetails({...additional_details, phone_no:e.target.value})
                            } 
                            style={{ width: '100%', padding: '5px', border:'1px solid gray' }} 
                            required
                        />
                    </div>
                    <div style={{width:'47%'}}>
                        <label >Birth Date:</label>
                        <input  
                            onChange={(e)=>
                                setAdditionalDetails({...additional_details, birthday:e.target.value})
                            } 
                            style={{ width: '100%', padding: '5px', border:'1px solid gray' }} 
                            type="date"
                            required
                        />
                    </div>
                </div>
                <div style={{ marginBottom: '10px', display:'flex', justifyContent:'space-between' }}>
                    <div style={{width:'47%'}}>
                        <label >Address</label>
                        <input  
                            onChange={(e)=>
                                setAdditionalDetails({...additional_details, address:e.target.value})
                            } 
                            style={{ width: '100%', padding: '5px', border:'1px solid gray' }} 
                            required
                        />
                    </div>
                    <div style={{width:'47%'}}>
                        <label >Gender</label>
                        <Select
                            options={['', 'male', 'female']}
                            onChange={(e)=>
                                setAdditionalDetails({...additional_details, gender:e.target.value})
                            }

                        />
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        style={{ width: '100%', padding: '5px', border:'1px solid gray' }} 
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" 
                        id="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        style={{ width: '100%', padding: '5px', border:'1px solid gray' }} 
                        required
                    />
                </div>
                 <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="password">Confirm Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={confirm_password} 
                        onChange={handleConfirmPasswordChange} 
                        style={{ width: '100%', padding: '5px', border:'1px solid gray' }} 
                        required
                    />
                </div>
                <div>
                    {error && <p style={{ color: 'red', fontSize:'0.80rem' }}>{error}</p>}
                </div>
                <div>
                    {message && <p style={{ color: 'green', fontSize:'0.80rem' }}>{message}</p>}
                </div>
                <button 
                    type="submit" 
                    style={{ width: '100%', padding: '10px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px', marginTop:'7px' }}
                    disabled={loading}
                >
                    {loading?'Loading...':'Register'}
                </button>
                 <div>
                    <p style={{ textAlign: 'center', marginBottom:'-10px' }}>Have an account? <a href="/">Login</a></p>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Register;
