import React, { useEffect, useState } from 'react';
import { fetchSeances, deleteSeance } from '../services/ApiServices';
import EditSeanceForm from './EditSeanceForm';

const SeanceTable = () => {
  const [seances, setSeances] = useState([]);
  const [editingSeance, setEditingSeance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSeances();
  }, []);

  const loadSeances = async () => {
    try {
      const { data } = await fetchSeances();
      setSeances(data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des séances.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette séance ?')) {
      try {
        await deleteSeance(id);
        loadSeances();
      } catch (err) {
        setError('Erreur lors de la suppression de la séance.');
      }
    }
  };

  if (loading) return <p>Chargement des séances...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Séances</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Titre du Film</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Horaire</th>
            <th className="py-2 px-4 border-b">Tarif</th>
            <th className="py-2 px-4 border-b">Salle</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {seances.map((seance) => (
            <tr key={seance._id}>
              <td className="py-2 px-4 border-b">{seance.film.title}</td>
              <td className="py-2 px-4 border-b">{new Date(seance.horaire).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{new Date(seance.horaire).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              <td className="py-2 px-4 border-b">{seance.tarif} €</td>
              <td className="py-2 px-4 border-b">{seance.room.name}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => setEditingSeance(seance)}
                  className="bg-blue-500 text-black py-1 px-3 rounded mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(seance._id)}
                  className="bg-red-500 text-black py-1 px-3 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingSeance && <EditSeanceForm seance={editingSeance} onClose={() => setEditingSeance(null)} />}
    </div>
  );
};

export default SeanceTable;
