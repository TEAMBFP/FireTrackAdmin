import React from 'react'
import './Styles.css'

const Switch = ({onChange}) => {
  return (
         <label className="switch">
            <input type="checkbox" onChange={onChange} defaultChecked/>
            <span className="slider round"></span>
          </label>
  )
}

export default Switch