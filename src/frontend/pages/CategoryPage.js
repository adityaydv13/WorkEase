 

// export default WorkerCategoryPage;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/category.css';

const WorkerCategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return; // stop execution
    }

    // Fetch workers by category
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/workers/category/${categoryName.trim()}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setWorkers(res.data.workers);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category workers:", err);
        setLoading(false);
      });
  }, [categoryName, navigate]);

  const hireWorker = async (workerId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/workers/hire/${workerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert('Request is send for approval ,waiting for worker approval.');
      } else {
        alert('Failed to hire worker');
      }
    } catch (err) {
      console.error(err);
      alert('Error hiring worker');
    }
  };

  if (loading) return <h2 className="center-text">Loading workers...</h2>;

 return (
  <div className="worker-grid">
  
  {workers.map(worker => (
    <div key={worker._id} className="worker-card">
      <div className="worker-card-left">
        <img
          src={worker.imageUrl || "/assets/default-worker.jpg"}
          alt={worker.name}
          className="worker-image"
        />
      </div>
      <div className="worker-card-right">
        <h3 className="worker-name">{worker.name}</h3>
        <p><span className="label">Skill:</span> {worker.workertype}</p>
        <p><span className="label">Experience:</span> {worker.experience || "Not specified"}</p>
        <p><span className="label">Contact:</span> {worker.phone}</p>
        <p><span className="label">Price/day:</span> ₹{worker.price || "N/A"}</p>
      </div>
        <div className="worker-card-actions">
            <button className="hire-button" onClick={() => hireWorker(worker._id)}>Hire</button>
                </div>
    </div>
        
  ))}
</div>
    );
};

export default WorkerCategoryPage;
