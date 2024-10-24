import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import { getFilmRatings, addOrUpdateRating, getUserFilmRating } from '../services/ApiServices';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-icon': {
    fontSize: 30, 
  },
  '& .MuiRating-iconFilled': {
    color: '#ffd700', 
  },
  '& .MuiRating-iconEmpty': {
    color: 'white', 
  },
}));

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function FilmRating({ filmId, userId }) {
  const [ratingValue, setRatingValue] = useState(-1);
  const [averageRating, setAverageRating] = useState();
  const [hover, setHover] = useState(-1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await getFilmRatings(filmId);
        const { averageRating } = response;
        setAverageRating(Number(averageRating));

        const userRes = await getUserFilmRating(filmId, userId);
        const userRating = userRes;
        console.log(userRating)
        if (userRating) {
          setRatingValue(userRating.ratingValue);
        }
      } catch (error) {
        console.error('Failed to fetch ratings:', error);
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
      setRatingValue(newValue);
      const { averageRating } = await getFilmRatings(filmId);
      setAverageRating(Number(averageRating));
      console.log(ratingValue)

      setError('');
    } catch (error) {
      setError('Failed to submit rating. Please try again.');
      console.error(error);
    }
  };

  return (
    <Box sx={{ width: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <h3>Rate this film:</h3>
      <StyledRating
        name="user-rating"
        value={ratingValue}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setRatingValue(newValue);
          handleRatingSubmit(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {hover !== -1 && <Box sx={{ color: 'white', mt: 1 }}>{labels[hover]}</Box>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h4>My Rating: {ratingValue || 'Not rated yet'}</h4>
      <Rating
        name="average-rating"
        value={averageRating || 0}
        precision={0.5}
        readOnly
        size="large"
      />
      <h4>Average Rating: {averageRating || 'N/A'}</h4>
    </Box>
  );
}

FilmRating.propTypes = {
  filmId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
