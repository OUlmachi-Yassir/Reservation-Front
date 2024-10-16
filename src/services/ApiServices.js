import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; 


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });
  
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });


  export const fetchFilms = () => axiosInstance.get('/films');
  export const updateFilm = (id, data) => axiosInstance.put(`/films/updateFilm/${id}`, data);
  export const deleteFilm = (id) => axiosInstance.delete(`/films/deleteFilm/${id}`);
  
  export const fetchRooms = () => axiosInstance.get('/rooms');
  export const updateRoom = (id, data) => axiosInstance.put(`/rooms/update/${id}`, data);
  export const deleteRoom = (id) => axiosInstance.delete(`/rooms/delete/${id}`);
  
  export const fetchSeances = () => axiosInstance.get('/seance');
  export const updateSeance = (id, data) => axiosInstance.put(`/seance/update/${id}`, data);
  export const deleteSeance = (id) => axiosInstance.delete(`/seance/delete/${id}`);