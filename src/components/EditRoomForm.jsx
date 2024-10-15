import React, { useState } from 'react';
import { updateRoom } from '../services/ApiServices';

const EditRoomForm = ({ room, onClose }) => {
  const [formData, setFormData] = useState({ ...room });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateRoom(room._id, formData); // Ensure this function works correctly
    onClose(); // Close the form after saving
  };

  return (
    <div className="modal" style={{
      position:"fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      height: "300px",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      zIndex: 1000,
      display: "block",
    }}>
      <h3>Edit Room</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Seats:</label>
          <input name="numberOfSeats" value={formData.numberOfSeats} onChange={handleChange} />
        </div>
        <div>
          <label>Type:</label>
          <input name="type" value={formData.type} onChange={handleChange} />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditRoomForm;

