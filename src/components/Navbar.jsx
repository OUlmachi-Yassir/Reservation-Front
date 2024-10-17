import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFilmsByTitre } from '../api/api.js';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const [searchFilm, setSearchFilm] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    console.log( localStorage.getItem('role')); 
  
    if (storedRole) {
      setRole(storedRole);
    } else {
      console.log('Aucun rôle trouvé');
    }
  }, []);

  const handleClick = async () => {
    const film = await getFilmsByTitre(searchFilm);
    if (film) {
      navigate(`/seances/${film._id}`);
    } else {
      console.log('Film not found');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-red navbar-dark">
      <div className="wrapper"></div>
      <div className="container-fluid all-show">
        <Link className="navbar-brand" to="/">
          Penton <i className="fa fa-codepen"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/seance">
                Seance
              </Link>
            </li>
            {token && (
              <li className="nav-item">
                {role === 'admin' ? (
                  <Link className="nav-link" to="/DashboardAdmin">
                    DashboardAdmin
                  </Link>
                ) : (
                  <Link className="nav-link" to="/Reservation">
                    My-Reservation
                  </Link>
                )}
              </li>
            )}
            <li className="nav-item d-flex">
              <input
                type="text"
                value={searchFilm}
                onChange={(e) => setSearchFilm(e.target.value)}
                placeholder="Search Film..."
                style={{ marginRight: '10px' }}
              />
              <button onClick={handleClick} className="btn btn-primary">
                Search
              </button>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link btn logout-button">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
