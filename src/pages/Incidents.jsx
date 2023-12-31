/* eslint-disable react/prop-types */
import { useEffect } from "react";
import apiService from "../api";
import React from "react";
import Switch from "../component/Switch/Switch";
import Table from "../component/Incident/Table";
import useDebounce from "../lib/Debounce";

export default function Incidents() {

  const [incidents, setIncidents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [tableMode, setTableMode] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const delaySearch = useDebounce(search, 700);


  useEffect(()=>{
    const getIncidents = async () => {
      try {
        setLoading(true);
        const response = await apiService.get('/reported-incidents?search='+delaySearch);
        setIncidents(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getIncidents();
  },[delaySearch])

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
          <div>
            <input style={{backgroundColor:'#E8E9EC'}} placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
          </div>
        </div>
      </div>
    {loading && incidents.length === 0 ? 
      <div>Loading...</div> 
      : 
      tableMode ?
      <Table data={incidents} />
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

