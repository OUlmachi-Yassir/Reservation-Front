import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; 

// Films
export const fetchFilms = () => axios.get(`${API_BASE_URL}/films`);
export const updateFilm = (id, data) => axios.put(`${API_BASE_URL}/films/updateFilm/${id}`, data);
export const deleteFilm = (id) => axios.delete(`${API_BASE_URL}/films/delete/${id}`);

// Rooms
export const fetchRooms = () => axios.get(`${API_BASE_URL}/rooms`);
export const updateRoom = (id, data) => axios.put(`${API_BASE_URL}/rooms/update/${id}`, data);
export const deleteRoom = (id) => axios.delete(`${API_BASE_URL}/rooms/delete/${id}`);

// Seances
export const fetchSeances = () => axios.get(`${API_BASE_URL}/seance`);
export const updateSeance = (id, data) => axios.put(`${API_BASE_URL}/seance/update/${id}`, data);
export const deleteSeance = (id) => axios.delete(`${API_BASE_URL}/seance/delete/${id}`);
