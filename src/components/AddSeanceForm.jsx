import React, { useEffect, useState } from 'react';
import { addSeance, fetchFilms, fetchRooms } from '../services/ApiServices'; 

const AddSeanceForm = ({ onClose }) => {
  const [seance, setSeance] = useState({
    film: '',
    room: '',
    horaire: '',
    tarif: '',
    seats: [], 
  });
  
  const [films, setFilms] = useState([]); 
  const [rooms, setRooms] = useState([]); 

  useEffect(() => {
    const loadFilmsAndRooms = async () => {
      try {
        const filmsResponse = await fetchFilms();
        const roomsResponse = await fetchRooms();
        setFilms(filmsResponse.data);
        setRooms(roomsResponse.data);
      } catch (error) {
        console.error('Erreur lors du chargement des films ou des salles:', error);
      }
    };
    loadFilmsAndRooms();
  }, []);

  const handleChange = (e) => {
    setSeance({ ...seance, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const seats = Array.from({ length: 50 }, (_, index) => ({
        seatNumber: (index + 1).toString(),
        isAvailable: true,
      }));
      const newSeance = { ...seance, seats }; 
      await addSeance(newSeance);
      console.log('Séance ajoutée avec succès');
      onClose(); 
    } catch (error) {
      console.error('Erreur lors de l’ajout de la séance:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h2>Ajouter une Séance</h2>
      
      <label>
        Film:
        <select name="film" value={seance.film} onChange={handleChange} required>
          <option value="">Sélectionnez un Film</option>
          {films.map((film) => (
            <option key={film._id} value={film._id}>{film.title}</option>
          ))}
        </select>
      </label>
      
      <label>
        Salle:
        <select name="room" value={seance.room} onChange={handleChange} required>
          <option value="">Sélectionnez une Salle</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>{room.name}</option>
          ))}
        </select>
      </label>

      <label>
        Horaire:
        <input
          type="datetime-local"
          name="horaire"
          value={seance.horaire}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Tarif:
        <input
          type="number"
          name="tarif"
          value={seance.tarif}
          onChange={handleChange}
          required
          placeholder="Entrer le tarif"
        />
      </label>
      
      <button type="submit">Ajouter Séance</button>
      <button type="button" onClick={onClose}>
        Annuler
      </button>
    </form>
  );
};

export default AddSeanceForm;
