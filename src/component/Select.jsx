/* eslint-disable react/prop-types */
import React from 'react'

export const Select = ({options,value, onChange}) => {
  return (
 
    <select
        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
        onChange={onChange}
        value={value}
    >
        {options.map((option)=>(
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </select>

  )
}

export default Select