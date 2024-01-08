/* eslint-disable react/prop-types */
import { useEffect } from "react";
import apiService from "../api";
import React from "react";
import Switch from "../component/Switch/Switch";
import Table from "../component/Incident/Table";
import useDebounce from "../lib/Debounce";
import { useNavigate } from 'react-router-dom';
import NestedDropdown from "../component/NestedDropdown/NestedDropdown";

export default function Incidents() {

  const [incidents, setIncidents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [tableMode, setTableMode] = React.useState(true);
  const [filter, setFilter] = React.useState({filter:'', name:''});


  useEffect(()=>{
    const getIncidents = async () => {
      try {
        setLoading(true);
        const response = await apiService.get('/reported-incidents?filter='+filter?.name||'');
        setIncidents(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getIncidents();
  },[filter])

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
        <div style={{padding:'10px', borderRadius:'10px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <p style={{color:'orange', fontWeight:'bold', fontSize:'28px'}}>
              Incidents Managements
          </p>
          <div style={{display:'flex', alignItems:'center', marginRight:'150px'}}>
            <NestedDropdown
              handleType={(e)=>{
                setFilter(e)
              }}
            />

            {filter?.name&&
           
              <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>

                <div style={{marginLeft:'15px'}}>
                  {filter?.name}
                </div>

                <div style={{cursor:'pointer', border:'1px solid black', borderRadius:'50%', display:'flex', alignItems:'center', marginLeft:'10px'}} onClick={()=>
                  setFilter({
                    filter:'',
                    name:''
                  })}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  width={18} height={18}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            }
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

