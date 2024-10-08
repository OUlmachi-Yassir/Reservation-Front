import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../myresrvation.css';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reservation/Myreservation', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setReservations(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="reservations-page">
      <h2>My Reservations</h2>
      {reservations.length === 0 ? (
        <p>You have no reservations yet.</p>
      ) : (
        <div className="reservations-list">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="reservation-card">
              <h3>Seance: {reservation.seance.name}</h3>
              <p>Date: {new Date(reservation.seance.date).toLocaleDateString()}</p>
              <p>Room: {reservation.seance.room.name}</p>
              <p>Seats: {reservation.seatNumbers.join(', ')}</p>
              <p>Reserved on: {new Date(reservation.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
