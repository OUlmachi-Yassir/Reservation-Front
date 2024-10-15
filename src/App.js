import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import SeanceList from './pages/Seance'
import './index.css';  
import './Nav.css';
import './SeanceCard.css'; 
import SeancePage from './pages/SeancePage';
import MyReservations from './pages/Reservation';
import Footer from './components/footer';
import DashboardAdmin from './pages/DashbordAdmin';


function App() {
  return (
    <div className="App">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="./1109696_Reflection_Glitter_3840x2160.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seance" element={<SeanceList />} />
          <Route path="/seances/:filmId" element={<SeancePage />} />
          <Route path="/Reservation" element={<MyReservations />} />
          <Route path="/dashboardAdmin" element={<DashboardAdmin />} />

          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
