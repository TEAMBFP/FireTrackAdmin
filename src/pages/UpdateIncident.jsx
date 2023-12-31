import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DateTimeFormat } from '../lib/DateTimeFormat';
import Select from '../component/Select';
import { useNavigate } from 'react-router-dom';
import PageLoader from '../component/PageLoader';
import apiService from '../api';


const UpdateIncident = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [responder, setResponder] = React.useState({
        commander:'',
        date:DateTimeFormat(new Date()),
        team:'',
        involved:'',
    });

    const [incident, setIncident] = React.useState({
        owner:'',
        fatality:'',
        damages:'',
        injured:'',
        numHouseAndEstablishment:'',
        numFamilyAffected:'',
        numTrucksResponded:'',
    });

    const [status, setStatus] = React.useState({
        timeArrival:'',
        fireOut:'',
        status:'pending',
    });

    const [loading,setLoading] = React.useState(false);



    const handleChangeStatus = (e) => {
       setStatus({...status, status:e.target.value});
       
    }

    const handleUpdate = async () => {
        setLoading(true);
        try {
            
            const payload = {
                incident: JSON.stringify(incident),
                responder: JSON.stringify(responder),
                status: JSON.stringify(status),
                id,
            }
            const res = await apiService.post('/update-incident', payload);
            setIncident(res.data.incident);
            setResponder(res.data.responder);
            setStatus(res.data.status);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        const handGetDetails = async () => {
            setLoading(true);
            try {
                const res = await apiService.get(`/get-incident-details?id=${id}`);
                console.log(res);
                setIncident(res.data.incident);
                setResponder(res.data.responder);
                setStatus(res.data.status);
                setLoading(false)
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        handGetDetails();
    },[id])

    
  return (
    <div style={{
        backgroundColor:'white', 
        width:'100%', 
        height:'100%',
        borderRadius:'8px',
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        padding:'16px',
        overflow:'scroll'

    }}>
     { loading? <PageLoader/>: null}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
                <h1 style={{color:'orange'}}>Update Incident</h1>
            </div>
            <div >
                <button 
                    onClick={handleUpdate}
                    style={{color:'white', backgroundColor:'orange'}}> 
                    Update
                </button>
                <button 
                    onClick={()=>navigate('/')}
                    style={{margin:'0px 8px 0 8px', color:'black'}}> 
                    Cancel
                </button>
            </div>
        </div>

        <hr style={{ borderTop: "2px solid orange", borderRadius: "5px", color:'orange'}}/>
        <div style={{display:'flex', justifyContent:'space-around', width:'100%'}}>
            {/*  INCIDENT */}
            <div style={{display:'flex', flexDirection:'column', rowGap:'9px', width:'30%'}}>
                    <span style={{fontWeight:'500', fontSize:'26px', margin:'5px 0px 5px 0px'}}>
                        Incident Information
                    </span>
                    <span style={{fontWeight:'600'}}>
                        Name of Owner
                    </span>
                    <input
                        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
                        placeholder="Owner"
                        onChange={(e)=>{
                            setIncident({...incident, owner:e.target.value})
                        }}
                        value={incident.owner}
                    />
                    <span style={{fontWeight:'600'}}>
                        Fatality
                    </span>
                    <input 
                        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
                        placeholder="Fatality"
                        onChange={(e)=>{
                            setIncident({...incident, fatality:e.target.value})
                        }}
                        value={incident.fatality}
                    />
                    <span style={{fontWeight:'600'}}>
                        Estimated Damages
                    </span>
                    <input
                        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
                        placeholder="Damages"
                        onChange={(e)=>{
                            setIncident({...incident, damages:e.target.value})
                        }}
                        value={incident.damages}
                    />
                    <span style={{fontWeight:'600'}}>
                        Injured
                    </span>
                    <input
                        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
                        placeholder="injured"
                        onChange={(e)=>{
                            setIncident({...incident, injured:e.target.value})
                        }}
                        value={incident.injured}
                    />
                    <span style={{fontWeight:'600'}}>
                        Number of House/Establishment
                    </span>
                    <input
                        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
                        placeholder="Number House/Establishment"
                        onChange={(e)=>{
                            setIncident({...incident, numHouseAndEstablishment:e.target.value})
                        }}
                        value={incident.numHouseAndEstablishment}
                    />
                    <span style={{fontWeight:'600'}}>
                        Number of Family Affected
                    </span>
                    <input
                        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
                        placeholder="Number of affected"
                        onChange={(e)=>{
                            setIncident({...incident, numFamilyAffected:e.target.value})
                        }}
                        value={incident.numFamilyAffected}
                    />
                    <span style={{fontWeight:'600'}}>
                        Number of Trucks Responded
                    </span>
                    <input
                        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
                        placeholder="Number of trucks responded"
                        onChange={(e)=>{
                            setIncident({...incident, numTrucksResponded:e.target.value})
                        }}
                        value={incident.numTrucksResponded}
                    />

            </div>

            {/*  REPONDER */}
            <div style={{display:'flex', flexDirection:'column', rowGap:'9px', width:'30%'}}>
                    <span style={{fontWeight:'500', fontSize:'26px', margin:'5px 0px 5px 0px'}}>Responder</span>
                    <span style={{fontWeight:'600'}}>
                        Ground Commander
                    </span>
                    <input
                        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
                        placeholder="Name"
                        onChange={(e)=>{
                            setResponder({...responder, commander:e.target.value})
                        }}
                        value={responder.commander}
                    />
                    <span style={{fontWeight:'600'}}>
                        Time/Date Reported
                    </span>
                    <input 
                        type="datetime-local" 
                        value={responder.date}
                        onChange={(e)=>{
                            setResponder({...responder, date: DateTimeFormat( new Date(e.target.value) )})
                        }}
                        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
                    />
                    <span style={{fontWeight:'600'}}>
                        Responding Team
                    </span>
                    <input
                        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
                        placeholder="Name"
                        onChange={(e)=>{
                            setResponder({...responder, team:e.target.value})
                        }}
                        value={responder.team}
                    />
                    <span style={{fontWeight:'600'}}>
                        Involved
                    </span>
                    <input
                        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
                        placeholder="Involved"
                        onChange={(e)=>{
                            setResponder({...responder, involved:e.target.value})
                        }}
                        value={responder.involved}
                    />

            </div>

            {/*  STATUS */}
             <div style={{display:'flex', flexDirection:'column', rowGap:'9px', width:'30%'}}>
                    <span style={{fontWeight:'500', fontSize:'26px', margin:'5px 0px 5px 0px'}}>Responder</span>
                    <span style={{fontWeight:'600'}}>
                        Time of arrival
                    </span>
                    <input
                        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
                        placeholder="Name"
                        onChange={(e)=>{
                            setStatus({...status, timeArrival:e.target.value})
                        }}
                        value={status.timeArrival}
                    />
                    <span style={{fontWeight:'600'}}>
                        Fire Out
                    </span>
                    <input 
                        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
                        placeholder="Name"
                        onChange={(e)=>{
                            setStatus({...status, fireOut:e.target.value})
                        }}
                        value={status.fireOut}
                    />
                    <span style={{fontWeight:'600'}}>
                       Status
                    </span>
                     <Select
                            options={['pending', 'done', 'on-going']}
                            onChange={handleChangeStatus}
                            value={status.status}
                        />

            </div>
        </div>


    </div>
  )
}



export default UpdateIncident