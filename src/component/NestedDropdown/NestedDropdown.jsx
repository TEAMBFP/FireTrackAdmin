/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './styles.css';
import apiService from '../../api';

const NestedDropdown = ({handleType}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState('');
  const [subMenu1, setSubMenu1] = useState([]);
  const [subMenu2, setSubMenu2] = useState([]);
  const [subMenu3, setSubMenu3] = useState([]);
  const [loading, setLoading] = useState(false);


 

  useEffect(() => {
    const handleGetSubMenu = async () => {
      setLoading(true)
    try {
          const structural = await apiService.get(`/get-fire-types?type=${'Structural'}`);
          const nonStructural = await apiService.get(`/get-fire-types?type=${'Non-Structural'}`);
          const vehicle = await apiService.get(`/get-fire-types?type=${'Vehicular'}`);
          if(structural?.data){
             setSubMenu1(structural.data);
          }

          if(nonStructural?.data){
            setSubMenu2(nonStructural.data);
          }

          if(vehicle?.data){
             setSubMenu3(vehicle.data)
          }
          setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }
  handleGetSubMenu()
  },[])


 
  
  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        Fire Type
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div  onClick={() => setMenu(menu === 'Structural'? '': 'Structural')}>
            Structural
          </div>
          {menu === 'Structural' && (
            <div className="dropdown-submenu">
              {
                loading?
                 <div className="dropdown-item">
                    Loading...
                  </div>
                  :
                subMenu1.map((item, index) => (
                  <div className="dropdown-item" key={index} onClick={()=>handleType(item)}>
                    {item.name}
                  </div>
                ))
              }
            </div>
          )}
          <div  onClick={() => setMenu(menu === 'Non-Structural'?'':'Non-Structural')}>
            Non-Structural
          </div>
          {menu === "Non-Structural"  && (
            <div className="dropdown-submenu">
                {
                loading?
                 <div className="dropdown-item">
                    Loading...
                  </div>
                  :
                subMenu2.map((item, index) => (
                  <div className="dropdown-item" key={index} onClick={()=>handleType(item)}>
                    {item.name}
                  </div>
                ))
                }
            </div>
          )}
           <div  onClick={() => setMenu(menu==='Vehicular'?'':'Vehicular')}>
            Vehicular
          </div>
          {menu === 'Vehicular' && (
            <div className="dropdown-submenu">
                {
                loading?
                 <div className="dropdown-item">
                    Loading...
                  </div>
                  :
                subMenu3.map((item, index) => (
                  <div className="dropdown-item" key={index} onClick={()=>handleType(item)}>
                    {item.name}
                  </div>
                ))
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NestedDropdown;