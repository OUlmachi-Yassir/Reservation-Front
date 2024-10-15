import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilmTable from '../components/FilmTable ';
import SeanceTable from '../components/SeanceTable';
import RoomTable from '../components/RoomTable';

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



  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/api/admins/statistics',  
          {headers: {
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
      <div className="" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem', 
        justifyContent: 'center', 
        alignItems: 'center',
        }}>

        <StatCard label="Clients" value={stats.users} />
        <br/>
        <StatCard label="Admins" value={stats.admins} />
        <br/>
        <StatCard label="Films" value={stats.films} />
        <br/>
        <StatCard label="Séances" value={stats.seances} />
        <br/>
        <StatCard label="Reservations" value={stats.reservations} />
      </div>
      
      <FilmTable />
        <RoomTable />
        <SeanceTable />
    </div>
  );
};


const StatCard = ({ label, value }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="" style={{
      padding: '1rem',
      maxWidth: '250px',
      width: '90%', 
      boxShadow: '5px 5px 4px rgba(255, 0, 0, 0.3)',
      borderRadius: '0.375rem',
      textAlign: 'center', 
      background: ' linear-gradient(90deg, rgba(0,0,0,1) 8%, rgba(255,0,0,1) 51%, rgba(0,0,0,1) 100%)',
      boxShadow: isHovered ? '0 2px 4px rgba(0, 255, 0, 0.3)' : '0 2px 4px rgba(255, 0, 0, 0.3)', 
      transition: 'box-shadow 0.3s ease', 
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
}
 

export default DashboardAdmin;
