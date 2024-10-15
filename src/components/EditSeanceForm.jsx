import React, { useState, useEffect } from 'react';
import { fetchFilms, fetchRooms, updateSeance } from '../services/ApiServices';


const EditSeanceForm = ({ seance, onClose }) => {
  const [formData, setFormData] = useState({
    horaire: new Date(seance.horaire).toISOString().slice(0, 16),
    tarif: seance.tarif,
    film: seance.film._id,
    room: seance.room._id,
  });
  const [films, setFilms] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFilmsAndRooms = async () => {
      try {
        const filmsData = await fetchFilms();
        const roomsData = await fetchRooms();
        setFilms(filmsData.data);
        setRooms(roomsData.data);
      } catch (err) {
        setError('Erreur lors du chargement des films ou des salles.');
      }
    };
    loadFilmsAndRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        horaire: new Date(formData.horaire).toISOString(),
      };
      await updateSeance(seance._id, updatedData);
      onClose();
      window.location.reload(); 
    } catch (err) {
      setError('Erreur lors de la mise à jour de la séance.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{
      position:"fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      height: "fit-content",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      zIndex: 1000,
      display: "block",
    }}>
        <h3 className="text-xl font-semibold mb-4">Modifier Séance</h3>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Horaire:</label>
            <input
              type="datetime-local"
              name="horaire"
              value={formData.horaire}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Tarif (€):</label>
            <input
              type="number"
              name="tarif"
              value={formData.tarif}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Film:</label>
            <select
              name="film"
              value={formData.film}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Sélectionnez un film</option>
              {films.map((film) => (
                <option key={film._id} value={film._id}>
                  {film.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Salle:</label>
            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Sélectionnez une salle</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.name} ({room.type})
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 text-black py-1 px-3 rounded mr-2">
              Annuler
            </button>
            <button type="submit" className="bg-blue-500 text-black py-1 px-3 rounded">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSeanceForm;
