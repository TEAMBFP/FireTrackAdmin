import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DateTimeFormat } from '../lib/DateTimeFormat';
import { useNavigate } from 'react-router-dom';
import PageLoader from '../component/PageLoader';
import apiService from '../api';
import SelectWithID from '../component/SelectWithID.jsx';
import { GetFireStatus } from '../api/FireVariablesAPI';


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
        type:'',
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

    const [listFireStatus, setListFireStatus] = React.useState([]);

    const [loading,setLoading] = React.useState(false);



    const handleChangeStatus = (e) => {

       setStatus({...status, status:parseInt(e.target.value)});
       
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
            if(res?.data?.incident){
                setIncident(res.data.incident);
            }
            if(res?.data?.responder){
                setResponder(res.data.responder);
            }
            if(res?.data?.status){
                setStatus(res.data.status);
            }
            if(res?.data?.fireStatus){
                setListFireStatus(res.data.fireStatus);
            }
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
                if(res?.data?.incident){
                    setIncident(res.data.incident);
                }
                if(res?.data?.responder){
                    setResponder(res.data.responder);
                }
                if(res?.data?.status){
                    setStatus(res.data.status);
                }
                if(res?.data?.fireStatus){
                    setListFireStatus(res.data.fireStatus);
                }
                setLoading(false)
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        const handGetFireStatus = async () => {
            try {
                const res = await GetFireStatus();
                setListFireStatus(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        handGetFireStatus()
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
                        Type of Occupancy
                    </span>
                    <span>
                        {incident.type}
                    </span>
                    <span style={{fontWeight:'600'}}>
                        Name of Owner
                    </span>
                    <span>
                        {incident.owner}
                    </span>
                    <span style={{fontWeight:'600'}}>
                        Fatality
                    </span>
                    <span>
                        {incident.fatality}
                    </span>
                    <span style={{fontWeight:'600'}}>
                        Estimated Damages
                    </span>
                    <span>
                        {incident.damages}
                    </span>
                    <span style={{fontWeight:'600'}}>
                        Injured
                    </span>
                    <span>
                        {incident.injured}
                    </span>
                    <span style={{fontWeight:'600'}}>
                        Number of House/Establishment
                    </span>
                    <span>
                        {incident.numHouseAndEstablishment}
                    </span>
                    <span style={{fontWeight:'600'}}>
                        Number of Family Affected
                    </span>
                    <span>
                        {incident.numFamilyAffected}
                    </span>
                    <span style={{fontWeight:'600'}}>
                        Number of Trucks Responded
                    </span>
                    <span>
                        {incident.numTrucksResponded}
                    </span>

            </div>

            {/*  REPONDER */}
            <div style={{display:'flex', flexDirection:'column', rowGap:'9px', width:'30%'}}>
                    <span style={{fontWeight:'500', fontSize:'26px', margin:'5px 0px 5px 0px'}}>Responder</span>
                    <span style={{fontWeight:'600'}}>
                        Ground Commander
                    </span>
                    <span>
                        {responder.commander}
                    </span>

                    <span style={{fontWeight:'600'}}>
                        Time/Date Reported
                    </span>
                    <span>
                        {responder.date}
                    </span>
                    <span style={{fontWeight:'600'}}>
                        Responding Team
                    </span>
                    <span>
                        {responder.team}
                    </span>
                    <span style={{fontWeight:'600'}}>
                        Involved
                    </span>
                    <span>
                        {responder.involved}
                    </span>
            </div>

            {/*  STATUS */}
             <div style={{display:'flex', flexDirection:'column', rowGap:'9px', width:'30%'}}>
                    <span style={{fontWeight:'500', fontSize:'26px', margin:'5px 0px 5px 0px'}}>Responder</span>
                    <span style={{fontWeight:'600'}}>
                        Time of Departure
                    </span>
                    <span>
                        {DateTimeFormat(status.departure_time)?? 'N/A'}
                    </span>
                    <span style={{fontWeight:'600'}}>
                        Time of arrival
                    </span>
                    <span>
                        {status.timeArrival}
                    </span>

                    <span style={{fontWeight:'600'}}>
                        Fire Out
                    </span>
                    <span>
                        {status.fireOut}
                    </span>
                    <span style={{fontWeight:'600'}}>
                       Status
                    </span>
                     {listFireStatus?.length > 0 &&
                   <SelectWithID
                        options={listFireStatus}
                        onChange={handleChangeStatus}
                        value={status.status}
                        loading={false}
                        field={'status'}
                   />
                     }

            </div>
        </div>


    </div>
  )
}



export default UpdateIncident