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
const startYear = new Date('2009-01-01').getFullYear();
const currentYear = new Date().getFullYear();
const yearslabel = Array.from(
  new Array(currentYear - startYear + 1),
  (val, index) => index + startYear
)
const test = [
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024'
]

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
  const [yearsIncidents, setYearsIncidents] = React.useState([]);


  useEffect(()=>{
    const handleGetIncidents = async ()=>{
      setLoading(true);
      try {
        const response = await apiService.get('/reported-incidents?year='+year);
        const yearsIncident = await apiService.get('/reported-incidents');
        const groupedIncidents = response.data.reduce((acc, incident) => {
        const key = incident.barangay;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(incident);
        return acc;
      }, {});
        const groupedYearsIncidents = yearsIncident.data.reduce((acc, incident) => {
        const key = incident.barangay;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(incident);
        return acc;
      }, {});
      setIncidents(groupedIncidents);
      setYearsIncidents(groupedYearsIncidents);
      setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }

    }
    handleGetIncidents();
  },[year])

  useEffect(()=>{
      const handleGetIncidents = async ()=>{
      setLoading(true);
      try {
        const yearsIncident = await apiService.get('/reported-incidents');
        const groupedYearsIncidents = yearsIncident.data.reduce((acc, incident) => {
        const key = incident.barangay;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(incident);
        return acc;
      }, {});
      setYearsIncidents(groupedYearsIncidents);
      setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }

    }
    handleGetIncidents();
  },[])

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

  const lineDataSet = {
    labels: yearslabel,
    datasets:  Object.keys(yearsIncidents).map((key,ind) => {
      const color = getRandomColor();
      return {
        label: key,
        data: yearslabel.map((data, ind) => {
          let count = 0;
          yearsIncidents[key].map(incident => new Date(incident.created_at).getFullYear() === data? count++:0);
          return count;
        }),
        backgroundColor: color,
        borderColor: color,
      }
    })
  }

 

  console.log(yearsIncidents, incidents);
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
    <Line
      options={options} 
      data={lineDataSet}
    />
     <Bar 
      options={options} 
      data={datasets} 
    />
    
    </div>
  )
}

export default DataVisualization