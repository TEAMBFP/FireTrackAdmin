/* eslint-disable react/prop-types */
import React from 'react';
import './styles.css';


const ReusableTable = ({data, header, onClick, handleDelete, empTable, loading}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    return (
        <div className="table-container" style={{height:'100%'}}>
            <table className="table">
                <thead>
                    <tr>
                        {header.map((item, index) => (
                            <th key={index} style={{position:'sticky', top:0, overflow:'hidden'}}>{item.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.length > 0 ?
                    data.map((item, index) => (
                     
                        <tr key={index} >
                               {header.map((field,key) => (
                               
                                field.field === 'image'?
                                <img src={item[field.field]} style={{width:'100px', height:'100px'}} key={key}/>
                                :
                                (field.field === 'action' && parseInt(user.user_type_id) === 5)||(field.field === 'action'&& empTable) ? 
                                <td key={key}> 
                                    <button onClick={()=>handleDelete(item.id)}>
                                        Delete
                                    </button>
                                </td>
                                :
                                 <td key={key} onClick={()=>onClick?onClick(item):{}}>{item[field.field]}</td>
                                 ))}
                        </tr>
                      
                    ))
                    :
                    loading ?
                    <tr>
                        <td colSpan={header.length} style={{textAlign:'center'}}>Loading...</td>
                    </tr>
                    :
                    <tr>
                        <td colSpan={header.length} style={{textAlign:'center'}}>No data</td>
                    </tr>
                    }
                    {/* Add more rows here */}
                </tbody>
            </table>
        </div>
    );
};

export default ReusableTable;
