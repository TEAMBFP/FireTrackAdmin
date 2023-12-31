/* eslint-disable react/prop-types */
import React from 'react';
import './Table.css';
import { useNavigate } from 'react-router-dom';

const header =  ['Image', 'Incident ID', 'Station', 'Date', 'Address', 'Status', 'Type of Occupancy','Status']

const Table = ({data}) => {
      const navigate = useNavigate();
    const handleClick = (id) => {
        console.log(id);
        navigate('/update-incident?id='+id);
    }
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {header.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ?
                    data.map((item, index) => (
                        <tr key={index} onClick={()=>handleClick(item.id)}>
                            <td>
                                <img src={item.image} style={{width:'100px', height:'100px'}}/>
                            </td>
                            <td>{item.id}</td>
                            <td>{item.station}</td>
                            <td>{item.created_at}</td>
                            <td>{item.location}</td>
                            <td>{item.status}</td>
                            <td>{item.type}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))
                    :
                    <tr>
                        <td colSpan={8} style={{textAlign:'center'}}>No data</td>
                    </tr>
                    }
                    {/* Add more rows here */}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
