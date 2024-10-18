import React, { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, getFavorites } from '../services/ApiServices'; // Import your API functions

const Favorite = ({ filmId, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(userId, filmId);
      } else {
        await addFavorite({ userId, filmId });
      }
      setIsFavorite(!isFavorite); 
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await getFavorites(userId);
        const isFav = data.favorites.some((fav) => fav.film._id === filmId);
        setIsFavorite(isFav);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, [filmId, userId]);

  return (
    <div onClick={toggleFavorite} style={{ cursor: 'pointer', width: '24px', height: '24px' ,color:'white' }}>
      <svg
        viewBox="0 0 24 24"
        fill={isFavorite ? 'red' : 'none'}
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </div>
  );
};

export default Favorite;
