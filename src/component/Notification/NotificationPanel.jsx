/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { GlobalVariables } from '../../GlobalState/GlobalVariables';
import Modal from '../Modal/Modal';
import apiService from '../../api';

const NotificationPanel = () => {
  const {notifications, fetchNotification} = useContext(GlobalVariables);
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [incident, setIncident] = useState(null);



  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };



  const panelStyle = {
    border: '1px solid #444',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    padding: '10px',
    marginBottom: '10px',
    display: isVisible ? 'block' : 'none',
    position: 'absolute',
    width: '25%',
    maxHeight: '60%',
    zIndex: '1',
    right:'80px',
    overflow:'scroll',
  };

  const buttonStyle = {
    position: 'relative',
    cursor: 'pointer',
    width: '38px',
  };

  const badgeStyle = {
    position: 'absolute',
    top: '0px',
    right: '0px',
    padding: '2px 5px',
    borderRadius: '50%',
    backgroundColor: 'red',
    color: 'white',
    fontSize: '10px',
    marginBottom:'10px'
  };

  const unRead = notifications.filter((notification) => notification?.status === 0)||[];

    const handleClickIncident = async (incident) => {
        try {
            const res = await apiService.get('/mark-as-read-notif?id=' + incident.id);
            if(res?.data){
                setModalOpen(true);
                setIncident(res.data)
                fetchNotification();
            }
        } catch (error) {
            console.log(error);
        }
      
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setIncident(null);
    }
  return (
    <div >
      <div style={buttonStyle} onClick={toggleVisibility}>
         <div style={badgeStyle}>{unRead?.length}</div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" width={28} height={28}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>

       
      </div>

      <div style={panelStyle}>
        <div style={{fontWeight:'bold'}}>
            Notifications
        </div>
         <hr />
        {
        notifications.length === 0 ?
        <p>No notifications</p>
        :
        notifications.map((notification, index) => (
            <>
                <p key={index}
                    style={
                        {
                            fontWeight:notification?.status === 0 ? 'bold' : 'normal',
                            color:notification?.status === 0 ? 'black' : 'gray',
                            cursor:'pointer'
                        }
                    }
                    onClick={()=>handleClickIncident(notification)}
                >{notification?.message}
                </p>
                <hr />
            </>
        ))
        }
      </div>
      {modalOpen &&
      <Modal
        open={modalOpen}
        Title={'Incident Details'}
        Content={() => 
            <IncidentDetails 
                incident={incident}
                handleClose={handleCloseModal}
            />
        }
        handleClose={handleCloseModal}
      />
}
    </div>
  );
};

export default NotificationPanel;


const IncidentDetails = ({incident, handleClose}) => {
    return (
        <div>
            <div>
                <img
                    src={incident?.image || null}
                    width={300}
                    height={300}
                    alt="INCIDENT IMAGE"
                />
            </div>
             <div>
                <h4>
                    Reported by: {incident?.reporter}
                </h4>
            </div>
            <div>
                <h4>
                    Location: {incident?.location}
                </h4>
            </div>
            <button onClick={handleClose}>
                Okay
            </button>
        </div>
    )
}