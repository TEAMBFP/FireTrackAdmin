/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import apiService from '../api'; 
import Pusher from 'pusher-js';

export const GlobalVariables = createContext({});



const GlobalVariablesProvider = ({children}) => {
    const token = localStorage.getItem('token');
    const [districts, setDistricts] = useState([]);
    const [fireStations, setFireStations] = useState([]);
    const [notifications, setNotification] = useState([]);
    const [userTypes, setUserTypes] = useState([]);

    useEffect(() => {

        const fireVariables = async () => {
            try {
                const stations = await apiService.get('/firestations');
                 if(stations?.data){
                    setFireStations(stations.data);
                }
                if(token){
                    const notification = await apiService.get('/notifications');
                    if(notification?.data){
                        setNotification(notification.data);
                    }
                }
                
                const district = await apiService.get('/districts');
                if(district?.data){
                    setDistricts(district.data);
                }

                const position = await apiService.get('/user-types');
                if(position?.data){
                    const filtered = position.data.filter((item) => item.name !== 'User');
                    setUserTypes(filtered);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fireVariables();
    }, [token])

     const fetchNotification = async () => {
            try {
                const res = await apiService.get('/notifications');
                if(res?.data){
                    setNotification(res.data);
                }
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() => {
        if(!token) return;
      let pusher = new Pusher('70f162759bae135d542a', {
        cluster: 'ap1'
      });

        const fetchNotification = async () => {
            try {
                const res = await apiService.get('/notifications');
                if(res?.data){
                    setNotification(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

    let channel = pusher.subscribe('my-channel');
      channel.bind('my-event', function(data) {
       fetchNotification();
        alert(JSON.stringify(data));
    });

    }, [token]);
    return (
        <GlobalVariables.Provider value={{
            districts,
            fireStations,
            notifications,
            fetchNotification,
            userTypes,
        }}>
            {children}
        </GlobalVariables.Provider>
    )

}

export default GlobalVariablesProvider;