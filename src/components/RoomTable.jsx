import React, { useEffect, useState } from 'react';
import { fetchRooms, deleteRoom } from '../services/ApiServices';
import EditRoomForm from './EditRoomForm';

const RoomTable = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const { data } = await fetchRooms();
    setRooms(data);
  };

  const handleDelete = async (id) => {
    await deleteRoom(id);
    loadRooms();
  };

  const handleEdit = (room) => {
    console.log("Editing room:", room); 
    setEditingRoom(room);
  };

  return (
    <div>
      <h2>Rooms</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Seats</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.name}</td>
              <td>{room.numberOfSeats}</td>
              <td>{room.type}</td>
              <td>
                <button onClick={() => handleEdit(room)}>Edit</button>
                <button onClick={() => handleDelete(room._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingRoom && (
        <div>
          <h3>Editing Room:</h3>
          <EditRoomForm room={editingRoom} onClose={() => setEditingRoom(null)} />
        </div>
      )}
    </div>
  );
};

export default RoomTable;
