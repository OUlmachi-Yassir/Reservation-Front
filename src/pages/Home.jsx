import React, { useEffect, useState } from 'react';
import { getFilms } from '../api/api';
import { getSeances } from '../api/apiSeance'; 
import SeanceCard from '../components/seanceCard'; 
import FilmCard from '../components/FilmCard';
import LogoSlider from '../components/ImageSlider';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/scrollbar'; 
import { Navigation, Scrollbar } from 'swiper/modules';

const Home = () => {
  const [films, setFilms] = useState([]);
  const [seance, setSeance] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  

  const filmsPerPage = 8; 
  const [currentPage, setCurrentPage] = useState(1); 

  const fetchFilms = async () => {
    try {
      const data = await getFilms();
      const seancesData = await getSeances();  
      setFilms(data);
      setSeance(seancesData[0]); 
      setLoading(false);
    } catch (err) {
      console.error('Error fetching films or seances:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const filteredFilms = films.filter(film =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredFilms.length / filmsPerPage);
  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = filteredFilms.slice(indexOfFirstFilm, indexOfLastFilm);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Loading films...</p>;
  if (error) return <p>Error loading films or seances. Please try again later.</p>;

  return (
    <div className="home-container">
      <div className="films-swiper">
        <Swiper
          modules={[Navigation, Scrollbar]}
          slidesPerView={5}  
          navigation  
          scrollbar={{ draggable: true }}  
        >
          {films.map((film) => (
            <SwiperSlide key={film._id}>
              <FilmCard film={film} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <br /><br />
      <hr style={{
          border: 'none',               
          height: '4px',               
          backgroundColor: 'red',      
          width: '50%',                 
          margin: '0 auto',
          boxShadow: '5px 5px 15px rgba(255, 0, 0)'
      }} />
      <br /><br />
      <div className="logoslider">
        <LogoSlider />
      </div>
      <br /><br />
      <hr style={{
          border: 'none',               
          height: '4px',              
          backgroundColor: 'red',      
          width: '50%',                 
          margin: '0 auto',
          boxShadow: '5px 5px 15px rgba(255, 0, 0)'
      }} />
      <div className="seance-list"  style={{ 
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap:'50px',
          padding: '20px',
      }}>
        <h1 style={{ 
            color: 'white', 
            WebkitTextStroke: '2px red', 
            writingMode: 'vertical-rl', 
            textOrientation: 'upright', 
            margin: '10px',
            fontSize: '4rem', 
            fontFamily: 'Arial, sans-serif', 
            fontWeight: 'bold',
            textShadow: '5px 5px 10px rgba(255, 0, 0, 0.8)', 
        }}>
        LATEST
        </h1>
        {seance && <SeanceCard key={seance._id} seance={seance} />} 
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap:'50px',
          padding: '20px',
        }}>
        <h1 style={{ 
            color:'rgba( 0, 0, 0.8)',
            fontSize: '4rem', 
            fontFamily: 'Arial, sans-serif', 
            fontWeight: 'bold',
            textShadow: '5px 5px 10px rgba(255, 0, 0, 0.8)', 
        }}>Films</h1>
        <input
          type="text"
          placeholder="Search for a film..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginTop: '10px',
            padding: '10px',
            marginBottom: '20px',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '5px',
            border: '2px solid red',           
            boxShadow: '0 0 5px red',           
            backgroundColor: 'transparent',     
            color: 'white',                      
            transition: 'background-color 0.3s',
          }}
        />
      </div>
      <div className="film-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent:'center' }}>
          {currentFilms.map(film => (
            <FilmCard key={film._id} film={film} />
          ))}
      </div>

      
      {filteredFilms.length > filmsPerPage && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              style={{
                padding: '10px',
                margin: '0 5px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: currentPage === index + 1 ? 'red' : 'lightgray',
                color: currentPage === index + 1 ? 'white' : 'black',
                cursor: 'pointer',
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
    </div>
  );
  
};

export default Home;
