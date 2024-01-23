import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import apiService from "../api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Reported Incidents this year',
    },
  },
scales: {
        y: {
          suggestedMin: 0,
          ticks: {
            precision: 0
          }
        }
      }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

export const data = {
  labels,
  datasets: [
    {
      label: 'barangay 1',
      data: labels.map((data,ind) => 10),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'barangay 2',
      data: labels.map(() => 9),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
const DataVisualization = () => {
  const [incidents, setIncidents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [year, setYear] = React.useState(new Date().getFullYear());


  useEffect(()=>{
    const handleGetIncidents = async ()=>{
      setLoading(true);
      try {
        const response = await apiService.get('/reported-incidents?year='+year);
        const groupedIncidents = response.data.reduce((acc, incident) => {
        const key = incident.barangay;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(incident);
        return acc;
      }, {});
      setIncidents(groupedIncidents);
      setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }

    }
    handleGetIncidents();
  },[year])

  const datasets = {
    labels,
    datasets:  Object.keys(incidents).map((key,ind) => {
      const color = getRandomColor();
      return {
        label: key,
        data: labels.map((data,ind) => {
          let count = 0;
          incidents[key].map(incident => new Date(incident.created_at).getMonth() === ind? count++:0);
          return count;
        }),
        backgroundColor: color,
        borderColor: color,
      }
    })
  };

 


  return (
    loading? <div>Loading...</div>:
    <div style={{height:'100%', overflow:'scroll'}}>
    <h3>Reported Incidents</h3>
    <div style={{marginLeft:'8px', marginBottom:'4px', fontWeight:'bold'}}>Year</div>
     <input
      type="number"
      pattern="[1-9]"
      placeholder="Year"
      style={{width:'20%', marginLeft:'10px'}}
      onChange={(e)=>setYear(e.target.value)}
      value={year}
    />
     <Bar 
      options={options} 
      data={datasets} 
    />
    <Line
     options={options} 
      data={datasets} 
    />
    </div>
  )
}

export default DataVisualization