/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import apiService from "../api";
import React from "react";
import Switch from "../component/Switch/Switch";
import Table from "../component/Incident/Table";
import { useNavigate } from 'react-router-dom';
import Select from "../component/Select";
import SelectWithID from "../component/SelectWithID";
import { GlobalVariables } from "../GlobalState/GlobalVariables";

export default function Incidents() {
  const {districts} = useContext(GlobalVariables)
  const [incidents, setIncidents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [tableMode, setTableMode] = React.useState(true);
  const [district_id, setDistrictID] = React.useState('');
  const [firestations, setFirestations] = React.useState([]);
  const [station, setStation] = React.useState('');
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [year, setYear] = React.useState(new Date().getFullYear());
    


  useEffect(()=>{
    const getIncidents = async () => {
      try {
        setLoading(true);
        const response = await apiService.get('/reported-incidents?fire_station_id='+station+'&month='+month+'&year='+year);
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
      if(district_id === '') return setFirestations([]);
      try {
          const response = await apiService.get('/firestations?district_id='+district_id);
          setFirestations(response.data);
          if(response.data.length > 0){
             setStation(response.data[0].id);
          }else{
             setStation(false);
          }
         
      } catch (error) {
          console.log(error);
      }

    }
    handleGetFirestations();
  },[district_id])

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
                <SelectWithID
                    options={[{id:'',name:'Select District'},...districts]}
                    width={'35%'}
                    onChange={(e) => setDistrictID(e.target.value)}
                    field={'name'}
                    value={district_id}
                />
                {firestations?.length > 0 &&
                   <SelectWithID
                    options={firestations}
                    width={'35%'}
                    onChange={(e) => setStation(e.target.value)}
                    field={'name'}
                  />
                }
                  <SelectWithID
                    options={[
                      {id:1, name:'January'},
                      {id:2, name:'February'},
                      {id:3, name:'March'},
                      {id:4, name:'April'},
                      {id:5, name:'May'},
                      {id:6, name:'June'},
                      {id:7, name:'July'},
                      {id:8, name:'August'},
                      {id:9, name:'September'},
                      {id:10, name:'October'},
                      {id:11, name:'November'},
                      {id:12, name:'December'},
                    ]}
                    width={'20%'}
                    onChange={(e) => setMonth(e.target.value)}
                    field={'name'}
                    value={month}
                    style={{ marginLeft:'10px'}}
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

