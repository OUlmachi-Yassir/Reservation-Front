import React, { useEffect, useState } from 'react';
import { getSeances } from '../api/apiSeance';  
import SeanceCard from '../components/seanceCard'; 

const SeanceList = () => {
  const [seances, setSeances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        const data = await getSeances();  
        setSeances(data);  
        setLoading(false); 
      } catch (err) {
        setError('Error fetching séance data');
        setLoading(false);
      }
    };

    fetchSeances();
  }, []);

  if (loading) {
    return <p>Loading seances...</p>;  
  }

  if (error) {
    return <p>{error}</p>;  
  }

  return (
    <div className="seance-list">
      {seances.map((seance) => (
        <SeanceCard key={seance._id} seance={seance} />  
      ))}
    </div>
  );
};

export default SeanceList;
