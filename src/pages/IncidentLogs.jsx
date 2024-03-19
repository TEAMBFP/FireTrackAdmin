/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import ReusableTable from '../component/ReusableTable/ReusableTable'
import apiService from '../api';
import Modal from '../component/Modal/Modal';

const IncidentLogs = () => {
  const [logs, setLogs] = React.useState([]);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [selectedLog, setSelectedLog] = React.useState();
  const [incidentDetails, setIncidentDetails] = React.useState();

  useEffect(() => {
      const handleGetLogs= async () => {
          try {
              const response = await apiService.get('/incident-logs');
             setLogs(response.data);
          } catch (error) {
              console.log(error);
          }
      }
      handleGetLogs();
  },[]);


  useEffect(() => {
      const getIncident = async () => {
        const incidentDetails = await apiService.get('/incident-details?id='+selectedLog.new_values.incident_id);
        setIncidentDetails(incidentDetails.data)
      }
      if(selectedLog){
         getIncident();
      }
   
  }, [selectedLog]);
  const ModalContent = () => {
    function compareObjects(obj1, obj2) {
      let changes =  [];
      for (let key in obj1) {
          if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
              if (obj1[key] !== obj2[key]) {
                  changes.push( ` ${key} from ${obj1[key]??"N/A"} to ${obj2[key]}`);
              }
          }
      }
      return changes.map((change, index) => <p key={index}>{change}</p>);
    }
    return (
      <div>
        <div>
            <h4>{selectedLog.event.charAt(0).toUpperCase() + selectedLog.event.slice(1)} by {selectedLog.user}</h4>
        </div>
        <div>
          Incident in   {incidentDetails?.location} on {incidentDetails?.created_at}
        </div>
        <div>
         {compareObjects(selectedLog.old_values.incident, selectedLog.new_values.incident)}
        </div>
         <div>
         {compareObjects(selectedLog.old_values.responder, selectedLog.new_values.responder)}
        </div>
        <div>
         {compareObjects(selectedLog.old_values.status, selectedLog.new_values.status)}
        </div>
        <div style={{marginTop:'50px'}}>
        <button onClick={()=>setIsOpenModal(false)}>
           OK
        </button>
        </div>
      </div>
    )
}

  return (
    <div style={{height:'86%'}}>
      <h1>Incident Logs</h1>
      <ReusableTable
        header={[
          {header:'Event', field:'event'},
          {header:'User', field:'user'},
          {header:'IP Address', field:'ip_address'},
          {header:'User Agent', field:'user_agent'},
        ]}
        data={logs}
        onClick={(e)=>{
          setIsOpenModal(true);
          setSelectedLog(e);
        }}
      />
        <Modal
            open={isOpenModal}
            Content={ModalContent}
        />
    </div>
  )
}

export default IncidentLogs


