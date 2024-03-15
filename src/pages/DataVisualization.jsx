import React, { useContext, useEffect } from 'react';
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
import { capture } from '../lib/ScreenShotById';
import { GlobalVariables } from '../GlobalState/GlobalVariables';
import SelectWithID from '../component/SelectWithID';
import Select from '../component/Select';

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
      text: 'Years of reported Incidents',
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


 const barOptions = {
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

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
const DataVisualization = () => {
  const {fireStations} = useContext(GlobalVariables);
  const [incidents, setIncidents] = React.useState([]);
  const [loadingLine, setLoadingLine] = React.useState(false);
  const [loadingBar, setLoadingBar] = React.useState(false);

  const [year, setYear] = React.useState(new Date().getFullYear());
  const [yearsIncidents, setYearsIncidents] = React.useState([]);
  const [mutatedYearsIncident, setMutatedYearsIncident] = React.useState([]);
  const [brgy, setBrgy] = React.useState([]);
  const [filter, setFilter] = React.useState('Filter by Barangay');

  useEffect(()=>{
    const handleGetIncidents = async ()=>{
      setLoadingBar(true);
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
      setLoadingBar(false);
      } catch (error) {
        setLoadingBar(false);
        console.log(error);
      }

    }
    handleGetIncidents();
  },[year])

  useEffect(()=>{
      const handleGetIncidents = async ()=>{
      setLoadingLine(true);
      try {
        const yearsIncident = await apiService.get(`/reported-incidents`);
        setYearsIncidents(yearsIncident.data);
      setLoadingLine(false);
      } catch (error) {
        setLoadingLine(false);
      }

    }
    if(incidents){
       handleGetIncidents();
    }
   
  },[incidents])

  useEffect(()=>{
        if(!yearsIncidents) return;
        const barangays = yearsIncidents.map((inci)=>
          inci.barangay
        ) 
        setBrgy([...new Set(barangays)])
        const filering = filter === 'Filter by Barangay'? yearsIncidents: yearsIncidents.filter((inci)=> inci.barangay === filter);
        const groupedYearsIncidents = filering.reduce((acc, incident) => {
        const key = incident.barangay;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(incident);
        return acc;
      }, {});
      setMutatedYearsIncident(groupedYearsIncidents);
  },[yearsIncidents,filter])

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


  console.log(mutatedYearsIncident);

  const lineDataSet = {
    labels: yearslabel,
    datasets:  Object.keys(mutatedYearsIncident).map((key,ind) => {
      const color = getRandomColor();
      return {
        label: key,
        data: yearslabel.map((data, ind) => {
          let count = 0;
          mutatedYearsIncident[key].map(incident => new Date(incident.created_at).getFullYear() === data? count++:0);
          return count;
        }),
        backgroundColor: color,
        borderColor: color,
      }
    })
  }

  console.log(yearsIncidents);

  return (
    <div style={{height:'100%', overflow:'scroll'}}>
    <h3>Reported Incidents</h3>
    <button onClick={()=>capture('line-chart','line-chart')}>Export Line Chart</button>
    <div style={{width:'25%'}}>
    <div style={{marginLeft:'8px', marginBottom:'4px', fontWeight:'bold'}}>Filter by Barangay</div>
    <Select
      options={['Filter by Barangay',...brgy]}
      value={filter}
      onChange={(e)=>setFilter(e.target.value)}
    />
    </div>
    {loadingLine? <div>Loading...</div>:
      <Line
        id='line-chart'
        options={options} 
        data={lineDataSet}
      />
    }
    <div style={{marginTop:'30px'}}>
      <div style={{marginLeft:'8px', marginBottom:'4px', fontWeight:'bold'}}>Filter Year</div>
     <input
      type="number"
      pattern="[1-9]"
      placeholder="Year"
      style={{width:'20%', marginLeft:'10px'}}
      onChange={(e)=>setYear(e.target.value)}
      value={year}
    />
    <button onClick={()=>capture('bar-chart','bar-chart')}>Export Bar Chart</button>
    {loadingBar? <div>Loading...</div>:
     <Bar 
      id='bar-chart'
      options={barOptions} 
      data={datasets} 
    />
  }
    </div>
    
    </div>
  )
}

export default DataVisualization