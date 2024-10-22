import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { getFilmRatings, addOrUpdateRating, getUserFilmRating } from '../services/ApiServices';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

export default function FilmRating({ filmId, userId }) {
  const [ratingValue, setRatingValue] = useState(null); 
  const [averageRating, setAverageRating] = useState();
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState('');
  console.log('Average Rating:', averageRating); 

  useEffect(() => {
    const fetchRatings = async () => {
        try {
          const response = await getFilmRatings(filmId);
          console.log('Fetched Ratings Response:', response); 
          const { averageRating, ratings = [] } = response; 
          setAverageRating(Number(averageRating));
          setRatings(ratings);
      
          const userRating = await getUserFilmRating(filmId, userId);
          if (userRating) {
            setRatingValue(userRating.ratingValue);
          }
        } catch (error) {
          console.error('Failed to fetch ratings:', error);
          setRatings([]); 
        }
      };
    fetchRatings();
  }, [filmId, userId]);

  const handleRatingSubmit = async (newValue) => {
    if (!newValue) {
      setError('Please select a rating.');
      return;
    }
    try {
      await addOrUpdateRating(filmId, userId, newValue);
      setError('');
      const { averageRating, ratings } = await getFilmRatings(filmId);
      setAverageRating(Number(averageRating));
      setRatings(ratings);
      setRatingValue(newValue); 
    } catch (error) {
      setError('Failed to submit rating. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Rate this film:</h3>
      <StyledRating
        name="customized-icons"
        value={ratingValue}
        onChange={(event, newValue) => {
          setRatingValue(newValue);
          handleRatingSubmit(newValue);
        }}
        highlightSelectedOnly
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h4>Average Rating: {averageRating}</h4>
      <h4>User Ratings:</h4>
      <ul>
        {ratings && ratings.length > 0 ? (
            console.log({ratings}),
            ratings.map((rating) => (
            <p key={rating._id}>{`User ${rating.userId}: ${rating.ratingValue}`}</p>
            ))
        ) : (
            <li>No ratings available</li>
        )}
        </ul>

    </div>
  );
}
