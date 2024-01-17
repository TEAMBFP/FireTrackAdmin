/* eslint-disable react/prop-types */
import { useEffect } from "react";
import apiService from "../api";
import React from "react";
import Switch from "../component/Switch/Switch";
import Table from "../component/Incident/Table";
import { useNavigate } from 'react-router-dom';
import Select from "../component/Select";

export default function Incidents() {

  const [incidents, setIncidents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [tableMode, setTableMode] = React.useState(true);
  const [district, setDistrict] = React.useState('select district');
  const [firestations, setFirestations] = React.useState([]);
  const [station, setStation] = React.useState('');
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [year, setYear] = React.useState(new Date().getFullYear());
    


  useEffect(()=>{
    const getIncidents = async () => {
      try {
        setLoading(true);
        const response = await apiService.get('/reported-incidents?station='+station+'&month='+month+'&year='+year);
        setIncidents(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getIncidents();
  },[station, month, year])

  useEffect(()=>{
    const handleGetFirestations = async () => {
      if(district === 'select district'){
        setStation('');
        return 0;
      }
      try {
          const response = await apiService.get('/firestations?district='+district);
          setFirestations(response.data);
          if(response.data.length > 0){
             setStation(response.data[0].address);
          }else{
             setStation(false);
          }
         
      } catch (error) {
          console.log(error);
      }

    }
    handleGetFirestations();
  },[district])

  const handleOnMyway = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const payload = { 
      id, 
      status: user.name + ' is on the way'
    };

    try {
      setLoading(true);
      await apiService.post(`/incident-update-status`,payload);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }


   const handleDelete = async (id) => {
      try {
       await apiService.post('/incident-delete', {id})
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
   }

    const navigate = useNavigate();
    const navigateToUpdateIncident = (id) => {
        console.log(id);
        navigate('/update-incident?id='+id);
    }


  return (
    <div style={{height:'100%', overflow:'scroll', width:'100%'}}>
      <div>
        <div style={{display:'flex', justifyContent:'end'}}>
          <span style={{marginRight:'6px',fontSize:'18px', fontWeight:500}}>Table Mode</span>
          <Switch
            onChange={() => setTableMode(!tableMode)}
          />
        </div>
        <div style={{padding:'10px', borderRadius:'10px',}}>
          <p style={{color:'orange', fontWeight:'bold', fontSize:'28px'}}>
              Incidents Managements
          </p>
            <div style={{width:'50%', marginTop:'13px', display:'flex'}}>
              <div style={{width:'35%', marginRight:'10px'}}>
                <Select
                    options={[ 'select district','Cagayan de Oro','Misamis Oriental', 'Misamis Occidental', 
                        'Bukidnon', 'Camiguin', 'Lanao', 'Iligan']}
                    onChange={(e) => setDistrict(e.target.value)}
                    value={district}
                />
                </div>
                
                {firestations?.length > 0 &&
                 <div style={{width:'50%'}}>
                   <Select
                    options={firestations.map((item) => item.address)}
                    onChange={(e) => setStation(e.target.value)}
                    value={station}
                  />
                  </div>
                }
                  <input
                    type="number"
                    pattern="[1-9]"
                    placeholder="Month"
                    style={{width:'20%', marginLeft:'10px'}}
                    onChange={(e)=>setMonth(e.target.value)}
                    value={month}
                  />
                   <input
                    type="number"
                    pattern="[1-9]"
                    placeholder="Year"
                    style={{width:'20%', marginLeft:'10px'}}
                    onChange={(e)=>setYear(e.target.value)}
                    value={year}
                  />
                </div>
                
        </div>
      </div>
    {loading && incidents.length === 0 ? 
      <div>Loading...</div> 
      : 
      tableMode ?
      <Table 
        data={incidents} 
        header={[
          {header: 'Image', field:'image' },
          {header: 'Incident ID', field: 'id'}, 
          {header: 'Station', field: 'station'}, 
          {header: 'Date', field: 'created_at'}, 
          {header: 'Address', field:'location'}, 
          {header: 'Status', field:'status'}, 
          {header: 'Type of Occupancy', field:'type'},
        ]}
        onClick={navigateToUpdateIncident}
      />
        :
      incidents.map((incident, index) => (
      <div id="contact" key={index} style={{marginBottom:'20px'}}>
      <div>
        <img
          key={index}
          src={incident.image || null}
          alt="INCIDENT"
        />
      </div>

      <div>
        <h2>
          {incident.location}
        </h2>

        
          <div style={{fontWeight:'bold'}}> 
           Fire Type: {incident.type}
          </div>
           <div style={{fontWeight:'bold', display:'flex', justifyContent:'space-between', alignItems:'center'}}> 
            <div>
              Status: {incident.status}
            </div>

              {incident.status === 'pending' ? 
            <button  >
              On my way!
            </button>
            :
            <button  >
              Delete
            </button>
            }
          
          </div>
        
       
      </div>
      </div>
      ))
    }
      
    
    </div>
  );
}

