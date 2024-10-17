import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilmTable from '../components/FilmTable ';
import SeanceTable from '../components/SeanceTable';
import RoomTable from '../components/RoomTable';
import AddFilmForm from '../components/AddFilmForm'; 
import AddRoomForm from '../components/AddRoomFotm';
import AddSeanceForm from '../components/AddSeanceForm';

const DashboardAdmin = () => {
  const [stats, setStats] = useState({
    users: 0,
    admins: 0,
    films: 0,
    seances: 0,
    reservations: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeForm, setActiveForm] = useState(null); 

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/api/admins/statistics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Statistics:', response.data);

        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div
        className=""
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StatCard label="Clients" value={stats.users} />
        <StatCard label="Admins" value={stats.admins} />
        <StatCard label="Films" value={stats.films} />
        <StatCard label="Séances" value={stats.seances} />
        <StatCard label="Reservations" value={stats.reservations} />
      </div>

      <div className="buttons" style={{ margin: '20px 0', textAlign: 'center' }}>
        <button onClick={() => setActiveForm('film')} className="btn btn-primary">
          Add Film
        </button>
        <button onClick={() => setActiveForm('room')} className="btn btn-primary">
          Add Room
        </button>
        <button onClick={() => setActiveForm('seance')} className="btn btn-primary">
          Add Séance
        </button>
      </div>

      <FilmTable />
      <RoomTable />
      <SeanceTable />

      {activeForm === 'film' && <Modal onClose={() => setActiveForm(null)}><AddFilmForm onClose={() => setActiveForm(null)} /></Modal>}
      {activeForm === 'room' && <Modal onClose={() => setActiveForm(null)}><AddRoomForm onClose={() => setActiveForm(null)} /></Modal>}
      {activeForm === 'seance' && <Modal onClose={() => setActiveForm(null)}><AddSeanceForm onClose={() => setActiveForm(null)} /></Modal>}
    </div>
  );
};

const StatCard = ({ label, value }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className=""
      style={{
        padding: '1rem',
        maxWidth: '250px',
        width: '90%',
        borderRadius: '0.375rem',
        textAlign: 'center',
        background: 'linear-gradient(90deg, rgba(0,0,0,1) 8%, rgba(255,0,0,1) 51%, rgba(0,0,0,1) 100%)',
        boxShadow: isHovered ? '0 2px 4px rgba(0, 255, 0, 0.3)' : '0 2px 4px rgba(255, 0, 0, 0.3)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="text-lg text-white font-semibold">{label}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

const Modal = ({ children, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      <button onClick={onClose} style={{ float: 'right' }}>
        X
      </button>
      {children}
    </div>
  );
};

export default DashboardAdmin;
