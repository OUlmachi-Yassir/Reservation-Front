import React, { useState } from 'react';
import { addSeance } from '../api/apiSeance'; 

const AddSeanceForm = ({ onClose }) => {
  const [seance, setSeance] = useState({
    filmId: '',
    roomId: '',
    startTime: '',
    endTime: '',
  });

  const handleChange = (e) => {
    setSeance({ ...seance, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSeance(seance);
      console.log('Séance ajoutée avec succès');
      onClose(); 
    } catch (error) {
      console.error('Erreur lors de l’ajout de la séance:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h2>Ajouter une Séance</h2>
      <input
        type="text"
        name="filmId"
        placeholder="ID du Film"
        value={seance.filmId}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="roomId"
        placeholder="ID de la Salle"
        value={seance.roomId}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="startTime"
        placeholder="Heure de Début"
        value={seance.startTime}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="endTime"
        placeholder="Heure de Fin"
        value={seance.endTime}
        onChange={handleChange}
        required
      />
      <button type="submit">Ajouter Séance</button>
      <button type="button" onClick={onClose}>
        Annuler
      </button>
    </form>
  );
};

export default AddSeanceForm;
