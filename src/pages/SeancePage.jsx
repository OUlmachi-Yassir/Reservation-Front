import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../seancePage.css'
const SeancePage = () => {
  const { filmId } = useParams();
  const [film, setFilm] = useState(null);
  const [seances, setSeances] = useState([]);

  useEffect(() => {
    const fetchFilmAndSeances = async () => {
      try {
        const filmResponse = await fetch(`http://localhost:3000/api/films/${filmId}`);
        const filmData = await filmResponse.json();
        setFilm(filmData);

        const seanceResponse = await fetch(`http://localhost:3000/api/seances?filmId=${filmId}`);
        const seanceData = await seanceResponse.json();
        setSeances(seanceData);
        
      } catch (error) {
        console.error('Error fetching film or seances:', error);
      }
    };

    fetchFilmAndSeances();
  }, [filmId]);

  return (
    <div className="film-page-wrapper">
      {film ? (
        <div className="film-container">
          <img
            src={`http://localhost:3000/${film.image}`}
            alt={film.title || "Film image"}
            className="film-poster"
          />
          <div>
            <div className="film-info">
              <h2>{film.title}</h2>
              <p><strong>Director:</strong> {film.director}</p>
              <p><strong>Release Year:</strong> {film.releaseYear}</p>
              <p><strong>Genre:</strong> {film.genre}</p>
            </div>
              
            {seances.length > 0 ? (
              <ul className="seance-list">
                {seances.map(seance => (
                  <li className="seance-item" key={seance._id}>
                    <p> {new Date(seance.horaire).toLocaleString()}</p>
                    <p> {seance.tarif} DH</p>
                    <p><strong>Salle:</strong> {seance.room?.name || 'Unknown'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No seances available for this film.</p>
            )}
          </div>
          <video controls width="400" src={film.video}/>
        </div>
      ) : (
        <p>Loading film details...</p>
      )}
    </div>
  );
};

export default SeancePage;
