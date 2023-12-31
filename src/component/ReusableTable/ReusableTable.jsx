/* eslint-disable react/prop-types */
import React from 'react';
import './styles.css';


const ReusableTable = ({data, header, onClick, handleDelete}) => {
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {header.map((item, index) => (
                            <th key={index}>{item.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ?
                    data.map((item, index) => (
                     
                        <tr key={index} >
                               {header.map((field,key) => (
                               
                                field.field === 'image'?
                                <img src={item[field.field]} style={{width:'100px', height:'100px'}} key={key}/>
                                :
                                field.field === 'action'?
                                <td key={key}> 
                                    <button onClick={()=>handleDelete(item.id)}>
                                        Delete
                                    </button>
                                </td>
                                :
                                 <td key={key} onClick={()=>onClick(item)}>{item[field.field]}</td>
                                 ))}
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

export default ReusableTable;
