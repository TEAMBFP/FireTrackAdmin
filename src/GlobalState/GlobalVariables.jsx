/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import apiService from '../api'; 
import Pusher from 'pusher-js';

export const GlobalVariables = createContext({});



const GlobalVariablesProvider = ({children}) => {
    const [districts, setDistricts] = useState([]);
    const [fireStations, setFireStations] = useState([]);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const res = await apiService.get('/districts');
                if(res?.data){
                    setDistricts(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        const fetchFireStations = async () => {
            try {
                const res = await apiService.get('/firestations');
                if(res?.data){
                    setFireStations(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchDistricts();
        fetchFireStations();
    },[])

    useEffect(() => {
      let pusher = new Pusher('70f162759bae135d542a', {
        cluster: 'ap1'
      });

    let channel = pusher.subscribe('my-channel');
      channel.bind('my-event', function(data) {
        alert(JSON.stringify(data));
    });

    }, []);
    return (
        <GlobalVariables.Provider value={{
            districts,
            fireStations
        }}>
            {children}
        </GlobalVariables.Provider>
    )

}

export default GlobalVariablesProvider;