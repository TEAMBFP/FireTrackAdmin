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
    const [region, setRegion] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [barangays, setBarangays] = useState([]);

    useEffect(() => {

        const fireVariables = async () => {
            try {
                const stations = await apiService.get('/firestations');
                 if(stations?.data){
                    setFireStations(stations.data);
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

    useEffect(() => {
        const authVariables = async () => {
            try {
                const region = await apiService.get('/regions');
                if(region?.data){
                    setRegion(region.data);
                }
                
                const notification = await apiService.get('/notifications');
                if(notification?.data){
                    setNotification(notification.data);
                }
                const employees = await apiService.get('/employee');
                if(employees?.data){
                    setEmployees(employees.data);
                }

                const barangay = await apiService.get('/barangays');
                if(barangay?.data){
                    setBarangays(barangay.data);
                }
               
            } catch (error) {
                console.log(error);
            }
        }
        if(token){
            authVariables();
        }
    },[token])

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
            region,
            employees,
            barangays
        }}>
            {children}
        </GlobalVariables.Provider>
    )

}

export default GlobalVariablesProvider;