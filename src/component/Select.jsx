/* eslint-disable react/prop-types */
import React from 'react'

export const Select = ({options,value, onChange, fontSize}) => {
  return (
    <select
        style={{height:'38px',  width:'100%', fontSize:fontSize, borderRadius:'8px', border:'1px solid black', outline:'none'}}
        onChange={onChange}
        value={value}
        required
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