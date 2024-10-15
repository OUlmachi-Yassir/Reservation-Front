import React, { useEffect, useState } from 'react';
import { fetchFilms, deleteFilm } from '../services/ApiServices';
import EditFilmForm from './EditFilmForm';

const FilmTable = () => {
  const [films, setFilms] = useState([]);
  const [editingFilm, setEditingFilm] = useState(null);

  useEffect(() => {
    loadFilms();
  }, []);

  const loadFilms = async () => {
    const { data } = await fetchFilms();
    setFilms(data);
  };

  const handleDelete = async (id) => {
    await deleteFilm(id);
    loadFilms();
  };

  return (
    <div>
      <h2>Films</h2>

      {/* Inline CSS */}
      <style>
        {`
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background-color: #f8f8f8;
          }

          th, td {
            border: 2px solid rgba(0,0,0,1) ;
            padding: 12px;
            text-align: center;
          }

          th {
            background-color: black;
            color: white;
          }

          tr:nth-child(even) {
            background-color: #f2f2f2;
          }

          tr:hover {
            background-color: #ddd;
            transition: background-color 0.3s;
          }

          button {
            margin: 5px;
            padding: 8px 12px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          button.edit{
          background-color: #ffc107;
          }
          button.delete{
          background-color: #da2700; ;
          }

          button.edit:hover {
            background-color: #0056b3;
          }
          button.delete:hover {
            background-color: #FFA07A;
          }

          img {
            border-radius: 8px;
          }
        `}
      </style>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => {
            const imageUrl = `http://localhost:3000/${film.image}`;
            return (
              <tr key={film._id}>
                <td>
                  <img
                    src={imageUrl}
                    style={{ width: "50px", height: "50px" }}
                    alt={film.title}
                  />
                </td>
                <td>{film.title}</td>
                <td>{film.director}</td>
                <td>{film.releaseYear}</td>
                <td>{film.genre}</td>
                <td>
                  <button className="edit" onClick={() => setEditingFilm(film)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(film._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {editingFilm && (
        <EditFilmForm film={editingFilm} onClose={() => setEditingFilm(null)} />
      )}
    </div>
  );
};

export default FilmTable;
