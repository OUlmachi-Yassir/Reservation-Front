import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../seancePage.css';
import Comments from '../components/Comments';
import Favorite from '../components/Favorite';
import Rating from '../components/Rating';  

const SeancePage = () => {
  const { filmId } = useParams();
  const [film, setFilm] = useState(null);
  const [seances, setSeances] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

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
    <div className="film">
      {film ? (
        <div className="flex flex-column">
          <div className="film-container">
            <img
              src={`http://localhost:3000/${film.image}`}
              alt={film.title || 'Film image'}
              className=""
              style={{
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                zIndex: 100,
              }}
            />
            <div style={{background:" linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,0,0,0.4823179271708683) 100%)", maxWidth:"600px" ,width:"100%", padding:"20px"}}>
              <div className="film-info">
                <div style={{display:"flex", gap:"20px" }}>
                <h2 style={{ fontSize: '50px',
                 fontFamily: 'Stencil Std, fantasy', 
                 fontWeight:"9OO" , 
                 color:"white",
                 textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                }}>
                  {film.title}
                </h2>
                {isAuthenticated && userId && (
                  <>
                  <div style={{display:"flex", gap:"20px"}}>
                    <Favorite filmId={film._id} userId={userId} />
                  </div>  
                  </>
                )}
                </div>
                <p style={{ color: '#FFBF00', fontSize: '20px' }}>
                  <strong>Director:</strong> {film.director}
                </p>
                <p style={{ color: '#FFBF00', fontSize: '20px' }}>
                  <strong>Release Year:</strong> {film.releaseYear}
                </p>
                <p style={{ color: '#FFBF00', fontSize: '20px' }}>
                  <strong>Genre:</strong> {film.genre}
                </p>
                <Rating filmId={film._id} userId={userId} />

                
              </div>

              {seances.length > 0 ? (
                <ul className="seance-list">
                  {seances.map((seance) => (
                    <li className="seance-item" key={seance._id}>
                      <p>{new Date(seance.horaire).toLocaleString()}</p>
                      <p>{seance.tarif} DH</p>
                      <p>
                        <strong>Salle:</strong> {seance.room?.name || 'Unknown'}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No seances available for this film.</p>
              )}
            </div>
            <div style={{}}></div>
          </div>

          <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
            <video controls  src={film.video} style={{maxWidth:"1000px", width:"60%",maxHeight:"700px", height:"50%"}}/>
            <Comments filmId={filmId} />
          </div>
        </div>
      ) : (
        <p>Loading film details...</p>
      )}
    </div>
  );
};

export default SeancePage;
