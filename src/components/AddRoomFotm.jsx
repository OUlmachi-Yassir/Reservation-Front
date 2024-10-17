import React, { useState } from 'react';
import { addRooms } from '../services/ApiServices'; 

const AddRoomForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [numberOfSeats, setCapacity] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const roomData = {
      name,
      type,
      numberOfSeats,
    };

    try {
      await addRooms(roomData);
      setSuccess('Room added successfully!');
      setName('');
      setType('');
      setCapacity(0);
    } catch (err) {
      setError('Failed to add room. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add New Room</h2>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Room Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium">Room Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="" disabled>Select room type</option>
            <option value="Standard">Standard</option>
            <option value="VIP">VIP</option>
            <option value="IMAX">IMAX</option>
            <option value="3D">3D</option>
          </select>
        </div>

        <div>
          <label htmlFor="numberOfSeats" className="block text-sm font-medium">Capacity</label>
          <input
            type="number"
            id="capacity"
            value={numberOfSeats}
            onChange={(e) => setCapacity(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;
