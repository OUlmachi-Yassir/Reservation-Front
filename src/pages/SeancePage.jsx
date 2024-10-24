import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../seancePage.css';
import Comments from '../components/Comments';
import Favorite from '../components/Favorite';
import Rating from '../components/Rating';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, IconButton, Modal, Typography } from '@mui/material';

const SeancePage = () => {
  const { filmId } = useParams();
  const [film, setFilm] = useState(null);
  const [seances, setSeances] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
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

  const handlePlayClick = () => {
    if (isAuthenticated) {
      setShowVideo(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="film">
      {film ? (
        <div className="flex">
          <div className="film-container" style={{ background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(163,0,0,0.1) 100%)" }}>
            <img
              src={`http://localhost:3000/${film.image}`}
              alt={film.title || 'Film image'}
              style={{
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
              }}
            />
            <div style={{background:" linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,0,0,0.4823179271708683) 100%)", maxWidth:"600px" ,width:"100%", padding:"20px",
              clipPath:"polygon(0% 0, 55% 0, 100% 50%, 100% 100%, 0% 100%)",
              borderRadius:"10px 0px 50px 10px",
            }}>
              <div className="film-info">
                <h2 style={{ fontSize: '50px', fontFamily: 'Stencil Std, fantasy', fontWeight: '900', color: 'white', textShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }}>
                  {film.title}
                </h2>
                {isAuthenticated && userId && <Favorite filmId={film._id} userId={userId} />}
                <p style={{ color: '#FFBF00', fontSize: '20px' }}><strong>Director:</strong> {film.director}</p>
                <p style={{ color: '#FFBF00', fontSize: '20px' }}><strong>Release Year:</strong> {film.releaseYear}</p>
                <p style={{ color: '#FFBF00', fontSize: '20px' }}><strong>Genre:</strong> {film.genre}</p>
                <Rating filmId={film._id} userId={userId} />
              </div>

              {seances.length > 0 ? (
                <ul className="seance-list">
                  {seances.map((seance) => (
                    <li className="seance-item" key={seance._id}>
                      <p>{new Date(seance.horaire).toLocaleString()}</p>
                      <p>{seance.tarif} DH</p>
                      <p><strong>Salle:</strong> {seance.room?.name || 'Unknown'}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No seances available for this film.</p>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', alignItems: 'center', background: "linear-gradient(180deg, rgba(0,0,0,1) 30%, rgba(163,0,0,0.05) 100%)" }}>
            <div style={{ position: 'relative', width: '60%', maxWidth: '1000px', marginLeft: '20px' }}>
              {!showVideo && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={handlePlayClick}
                >
                  <IconButton color="primary" size="large">
                    <PlayArrowIcon sx={{ fontSize: 80 }} />
                  </IconButton>
                </Box>
              )}
              {showVideo && <video controls src={film.video} style={{ width: '100%', borderRadius: '10px' }} />}
            </div>
            <Comments filmId={filmId} />
          </div>
        </div>
      ) : (
        <p>Loading film details...</p>
      )}

      <Modal open={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <Box sx={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', margin: 'auto', marginTop: '20vh', maxWidth: '300px' }}>
          <Typography variant="h6">You need to log in to watch this video</Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default SeancePage;
