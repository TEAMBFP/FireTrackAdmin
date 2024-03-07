import React from "react";
import GoogleMapReact from 'google-map-react';
import ReusableTable from "../component/ReusableTable/ReusableTable";
import apiService from "../api";
import { capture } from "../lib/ScreenShotById";

const startYear = new Date('2009-01-01').getFullYear();
const endYear = new Date().getFullYear();
const years = [{header:'Barangay', field:'barangay'}];
for(let i = startYear; i <= endYear; i++){
  years.push(
    {header:i.toString()==='2024'?'Total':i.toString(), field:i.toString()}
  );
}


export default function Heatmap(){
  const [datasets, setDatasets] = React.useState([]);
  const [loading,setLoading] = React.useState({
    datasets: false,
    predictions: false
  });

  const defaultProps = {
    center: {
      lat: 8.48059,
      lng: 124.6512
    },
    zoom: 10
  };
  const heatMapData ={    
  positions: [
    {lat: 8.4707939, lng: 124.648318, weight: 26},
    {lat: 8.483481399999999, lng: 124.6616415, weight: 31},
    {lat: 8.497925, lng: 124.7602683, weight: 5},
    {lat: 8.5005261, lng: 124.6357671, weight: 27},
    {lat: 8.4517344, lng: 124.779603, weight: 3},
    {lat: 8.4483915, lng: 124.6272475, weight: 10},
    {lat: 8.4676022, lng: 124.6220997, weight: 48},
    {lat: 8.4125734, lng: 124.6102953, weight: 31},
    {lat: 8.4505176, lng: 124.5832928, weight: 5},
    {lat: 8.4349256, lng: 124.6690605, weight: 14},
    {lat: 8.507242399999999, lng: 124.7602683, weight: 9},
    {lat: 8.4788315, lng: 124.7234807, weight: 15},
    {lat: 8.499703799999999, lng: 124.6621469, weight: 21},
    {lat: 8.4464644, lng: 124.646935, weight: 13}
  ],
    options: {   
        radius: 20,   
        opacity: 0.8,
    }
  }

  React.useEffect(() => {
    const getDataSet = async () => {
      try {
        setLoading({...loading, datasets: true})
        const requestDataSets = await apiService.get('/datasets');
        if(requestDataSets.status === 200 && requestDataSets?.data?.length > 0){
          setDatasets(requestDataSets?.data);
          setLoading({...loading, datasets: false})

          setLoading({...loading, datasets: false, predictions: true})

        // PREDICTION PART
        const requestPredictions = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestDataSets?.data)
        });
        if(requestPredictions.status === 200){
           setLoading({...loading, datasets: false, predictions: false})
          const responseData = await requestPredictions.json();
          const datasetsandPredictions = requestDataSets?.data?.map((dataset) => (
            {
              ...dataset,
              '2024': responseData.predictions[dataset.barangay]
            }

          ))
          if(datasetsandPredictions.length > 0){
             setDatasets(datasetsandPredictions);
          }
         
        }
         setLoading({...loading, datasets: false, predictions: false})
        }

      } catch (error) {
        console.error(error)
        setLoading({...loading, datasets: false, predictions: false})
      }
    }
    
    getDataSet();
  }, []);

  return (
    // Important! Always set the container height explicitly
    <div style={{  width: '100%', overflow:'scroll', height:'87vh' }}>
      {
      
        loading.predictions && <p>Loading predictions...</p>
      }
        <ReusableTable
          data={datasets}
          header={years}
          loading={loading.datasets}
        />
        <div style={{margin:'20px 0px 20px 0px'}}>
        <button onClick={()=>capture('gmaps','Heat-map')}>
          Download Heatmap
        </button>
        </div>
        <div id={'gmaps'} style={{ height: '100vh', width: '100%', marginTop:'34px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            heatmapLibrary={true}          
            heatmap={heatMapData}
          >
            {heatMapData.positions.map((position, index) => (
         
                <Marker 
                key={index}
                lat={position.lat}
                lng={position.lng}
                text={position.weight}
                />

        ))}
          </GoogleMapReact>
          
      </div>
    </div>
  );
}

const greatPlaceStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',


  
}

const Marker = ({text}) => {
  return <div>
    <div style={greatPlaceStyle}>
      <div style={{
       
        height: '100%',
      }}>
      {text}
      </div>
    </div>
  </div>
}
