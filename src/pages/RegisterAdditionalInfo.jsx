import  { useState, useContext, useEffect } from 'react';
import apiService from '../api';
import { GlobalVariables } from '../GlobalState/GlobalVariables';
import SelectWithID from '../component/SelectWithID';

const RegisterAdditionalInfo = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const {fireStations, districts, userTypes} = useContext(GlobalVariables);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState('');
    const [additional_details, setAdditionalDetails] = useState({
        district_id:'',
        firestation_id:''
    });
   


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { 
            id:user.id,
            user_type_id: userType,
            info: {...additional_details, ...user.info}
        };
        console.log(payload);
        
        try {
            setLoading(true)
            const res = await apiService.post('/additional_info', payload );
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

    };
    useEffect(() => {
        if(!user || !user?.info){
            window.location.href = '/';
        }
    
    }, [user])
    console.log(user);
   
    return (
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'100%' }}>
            <div>
            <form style={{  padding: '20px 50px 20px 50px', border: '1px solid #ccc', borderRadius: '5px' }} onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Additional Information</h2>
                <div style={{ marginBottom: '10px' }}>
                    <label >Position:</label>
                    {/* <input 
                        onChange={(e)=>setAdditionalDetails({...additional_details, position:e.target.value})} 
                        style={{ width: '100%', padding: '5px', border:'1px solid gray' }} 
                    /> */}
                    <SelectWithID
                        options={['',...userTypes]} 
                        field={'name'}
                        fontSize={'0.75rem'}
                        onChange={(e)=>{
                            setUserType(e.target.value)
                            if(e.target.value === '1'|| e.target.value === '5'){
                                setAdditionalDetails({...additional_details, district_id:'', firestation_id:''})
                            }
                            if(e.target.value === '2'){
                                setAdditionalDetails({...additional_details, firestation_id:''})
                            }
                        }}
                        value={userType}
                    />
                </div>
                <div style={{ marginBottom: '10px', display:'flex', justifyContent:'space-between' }}>
                        <div style={{width:'47%'}}>
                            <label >District</label>
                            <SelectWithID 
                                options={[
                                    {id:'', name:''}
                                    ,...districts]}
                                field={'name'}
                                value={additional_details.district_id}
                                onChange={(e)=>
                                    {setAdditionalDetails({...additional_details, district_id:e.target.value})
                                    console.log(e.target.value);}
                                }
                                required={true}
                                disabled={userType === '1'|| userType === '5'}
                            />
                        </div>
                        <div style={{width:'47%'}}>
                            <label >Firestation</label>
                            <SelectWithID
                                options={[
                                    {id:'', address:''}
                                    ,...fireStations]}
                                field={'address'}
                                value={additional_details.firestation_id}
                                onChange={(e)=>
                                    setAdditionalDetails({...additional_details, firestation_id:e.target.value})
                                }
                                required={true}
                                disabled={userType === '1' || userType === '2'|| userType === '5' || (additional_details.district_id !== '1'&& additional_details.district_id )}
                            />
                        </div>
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
            </form>
            </div>
        </div>
    );
};

export default RegisterAdditionalInfo;
