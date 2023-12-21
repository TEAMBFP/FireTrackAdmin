/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Form } from "react-router-dom";
import apiService from "../api";
import React from "react";

export default function Incidents() {

  const [incidents, setIncidents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(()=>{
    const getIncidents = async () => {
      try {
        setLoading(true);
        const response = await apiService.get('/reported-incidents');
        setIncidents(response.data);
       setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getIncidents();
  },[])

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
    {loading && incidents.length === 0 ? 
      <div>Loading...</div> 
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
            <button onClick={()=>handleOnMyway(incident.id)} >
              On my way!
            </button>
            :
            <button onClick={()=>handleDelete(incident.id)} style={{color:'red'}} >
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

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}