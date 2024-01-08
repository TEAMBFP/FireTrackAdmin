/* eslint-disable react/prop-types */
import React from 'react'

export const Select = ({options,value, onChange}) => {
  return (
    <select
        style={{height:'45px',  width:'100%', fontSize:'16px', borderRadius:'8px', border:'1px solid #ccc', paddingTop:'10px', paddingBottom:'10px', outline:'none'}}
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