import React, { useState } from 'react';
import axios from 'axios';



const SeanceCard = ({ seance }) => {
  const { horaire, tarif, room, film } = seance;
  const imageUrl = `http://localhost:3000/${film.image}`;

  const clientId = localStorage.getItem('token');
  const [showSeats, setShowSeats] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [messagePopup, setMessagePopup] = useState({ visible: false, message: '', success: false }); // New state for message popup

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleReserveClick = () => {
    setShowSeats(true);
  };

  const handleClosePopup = () => {
    setShowSeats(false);
    setSelectedSeats([]);
  };

  const handleSeatClick = (seat) => {
    if (!seat.isAvailable) return;

    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat.seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seat.seatNumber]);
    }
  };

  const handleConfirmReservation = async () => {
    if (!clientId) {
      setErrorMessage('You need to be logged in to reserve seats.');
      return;
    }

    if (selectedSeats.length === 0) {
      setErrorMessage('Please select at least one seat.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/reservation/Add', {
        seance: seance._id,
        seatNumbers: selectedSeats,
      }, {
        headers: { Authorization: `Bearer ${clientId}` }
      });

      if (response.status === 201) {
        setMessagePopup({ visible: true, message: 'Seats reserved successfully!', success: true });
        handleClosePopup();
      }
    } catch (error) {
      setMessagePopup({ visible: true, message: error.response?.data?.message || 'An error occurred while reserving seats.', success: false });
    }
  };

  const handleCloseMessage = () => {
    setMessagePopup({ ...messagePopup, visible: false });
  };

  return (
    
    <div className="seance-card">
      <img
        src={imageUrl}
        alt={film.title || "Film image"}
        className="film-image"
      />
      <div className="s-card">
        <h2 className="title">Séance de film</h2>
        <p className="Pdate"><strong>Date et heure :</strong> {formatDate(horaire)}</p>
        <p className="Pcolor"><strong>Tarif :</strong> {tarif} DH</p>
        <p className="Pcolore"><strong>Salle :</strong> {room?.name || 'Non spécifiée'} ({room?.type || 'Type inconnu'})</p>

        <button type="button"  onClick={handleReserveClick} className="reserve-button">
          <strong>RESERVE</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>

          <div id="glow">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
      </button>
      </div>

      {showSeats && (
        <div className="seats-popup">
          <div className="popup-content">
            <button className="close-button1" onClick={handleClosePopup}>X</button>
            <h3>Available Seats</h3>
            <div className="seats-container">
  {seance?.seats.map((seat) => (
    <div key={seat._id} className="customCheckBoxHolder">
      <input
        type="checkbox"
        id={`seat-${seat._id}`}
        className="customCheckBoxInput"
        checked={selectedSeats.includes(seat.seatNumber)}
        disabled={!seat.isAvailable}
        onChange={() => handleSeatClick(seat)}
      />
      <label htmlFor={`seat-${seat._id}`} className="customCheckBoxWrapper">
        <div className={`seat ${seat.isAvailable ? 'available' : 'unavailable'}`}>
          {seat.seatNumber}
        </div>
      </label>
    </div>
  ))}
</div>

            <button className="confirm-button" onClick={handleConfirmReservation} >
              <span className="top-key"></span>
              <span className="text">Confirm Reservation</span>
              <span className="bottom-key-1"></span>
              <span className="bottom-key-2"></span>
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      )}

      {messagePopup.visible && (
        <div className={`cardMessage ${messagePopup.success ? 'success' : 'error'}`}>
          <svg className="wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
              fillOpacity="1"
            ></path>
          </svg>

          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              strokeWidth="0"
              fill="currentColor"
              className={`icon ${messagePopup.success ? 'success-icon' : 'error-icon'}`}
            >
              {messagePopup.success ? (
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
              ) : (
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM279.4 198.6l-23.4-23.4c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l23.4 23.4c-4.4 4.4-9.8 7.8-15.4 10.3-7 3.1-14.7 4.8-22.5 4.8-22.2 0-42.9-8.6-58.5-24.2-16.8-16.8-24.8-39.4-24.8-62.5 0-7.8 1.7-15.5 4.8-22.5 2.5-5.6 5.9-11 10.3-15.4l-23.4-23.4c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9c12.3 12.3 12.3 32.2 0 44.6-12.3 12.3-32.2 12.3-44.6 0-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9c4.4 4.4 9.8 7.8 15.4 10.3 7 3.1 14.7 4.8 22.5 4.8 22.2 0 42.9-8.6 58.5-24.2 16.8-16.8 24.8-39.4 24.8-62.5 0-7.8-1.7-15.5-4.8-22.5-2.5-5.6-5.9-11-10.3-15.4z" />
              )}
            </svg>
          </div>

          <div className="message">
            <h3>{messagePopup.message}</h3>
            <button onClick={handleCloseMessage} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeanceCard;
