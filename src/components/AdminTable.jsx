import React, { useEffect, useState } from 'react';
import { fetchAdmins, deleteAdmin } from '../services/ApiServices'; 
import EditAdminForm from './EditAdminForm';

const TableAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await fetchAdmins();
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };
    getAdmins();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAdmin(id);
      setAdmins(admins.filter((admin) => admin._id !== id)); 
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  return (
    <div>
      <h2>Admin Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>
                <button onClick={() => setEditingAdmin(admin)}>Edit</button>
                <button onClick={() => handleDelete(admin._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingAdmin && (
        <EditAdminForm
          admin={editingAdmin}
          setEditingAdmin={setEditingAdmin}
          setAdmins={setAdmins}
        />
      )}
    </div>
  );
};

export default TableAdmin;
