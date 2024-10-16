import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
 
);


export const getFilms = async () => {
    try {
      const response = await api.get('/api/films');
      return response.data;
    } catch (error) {
      console.error('Error fetching films:', error);
      throw error;
    }
  };


  export const getFilmsByTitre = async ( titre) => {
    const films = await getFilms(); 
    const film = films.find((film) =>
      film.title.toLowerCase().includes(titre.toLowerCase())
    );
    return film;
  }




export default api;
