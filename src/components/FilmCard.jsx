import React from 'react';
import { useNavigate } from 'react-router-dom';

const FilmCard = ({ film }) => {
  const navigate = useNavigate(); 
  const imageUrl = `http://localhost:3000/${film.image}`;

  const handleCardClick = () => {
    navigate(`/seances/${film._id}`);
  };

  return (
    <div className="film-card" onClick={handleCardClick}>
      <img
        src={imageUrl}
        alt={film.title || "Film image"}
        className="film-image"
      />
      <div className="film-description">
        <h3>{film.title}</h3>
        <p>{film.director}</p>
        <p>Release Year: {film.releaseYear}</p>
      </div>
    </div>
  );
};

export default FilmCard;
