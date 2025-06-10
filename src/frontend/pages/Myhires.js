import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/myhires.css'; // Import the CSS

const Myhires = ({ refreshToggle }) => {
  const [hiredWorkers, setHiredWorkers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHiredWorkers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/hires`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHiredWorkers(response.data.hires);
    } catch (err) {
      console.error('Error fetching hires:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorker = async (hireId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/hires/${hireId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Hire deleted successfully');
        setHiredWorkers(prev => prev.filter(h => h._id !== hireId));
      } else {
        alert('Failed to delete hire');
      }
    } catch (err) {
      console.error('Error deleting hire:', err.response || err.message || err);
      alert(`Error deleting hire: ${err.response?.data?.message || err.message || 'Unknown error'}`);
    }
  };

  useEffect(() => {
    fetchHiredWorkers();
  }, [refreshToggle]);

  return (
    <div className="myhires-container">
      <h2 className="myhires-title">My Hired Workers</h2>
      {loading ? (
        <p className="myhires-loading">Loading...</p>
      ) : hiredWorkers.length === 0 ? (
        <p className="myhires-empty">No hired workers found.</p>
      ) : (
        <div className="myhires-grid">
          {hiredWorkers.map((hire) => (
            <div key={hire._id} className="myhires-card">
              <h4>{hire.workerId?.name || 'Unnamed Worker'}</h4>
              <p><strong>Skill:</strong> {hire.workerId?.workertype}</p>

                <p><strong>Phone:</strong> {hire.workerId?.phone}</p>

              <p><strong>Status:</strong> {hire.status}</p>
               <p><strong>Hired On:</strong> {new Date(hire.hireDate).toLocaleDateString()}</p>
              <button className="delete-btn" onClick={() => deleteWorker(hire._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Myhires;
