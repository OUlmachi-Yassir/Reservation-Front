import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});



export const getSeances = async () => {
    try {
      const response = await api.get('/api/seance');
      return response.data;
    } catch (error) {
      console.error('Error fetching films:', error);
      throw error;
    }
  };
  




export default api;
