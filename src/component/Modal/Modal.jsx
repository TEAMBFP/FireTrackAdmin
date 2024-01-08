/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './styles.css';

const Modal = ({open,Content, Title}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{Title}</h2>
            {Content()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;