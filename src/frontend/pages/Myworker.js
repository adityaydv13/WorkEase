 
import   { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/myworker.css';


const MyWorkerPage = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchWorkers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/worker/my-worker`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWorkers(res.data);
    } catch (err) {
      console.error('Error fetching workers:', err);
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorker = async (workerId) => {
    try {
      await axios.delete(`http://localhost:5000/api/worker/${workerId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Worker profile deleted');
      // Remove deleted worker from state
      setWorkers(workers.filter(w => w._id !== workerId));
    } catch (err) {
      alert('Error deleting worker');
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!workers.length) return <p>No worker profiles found.</p>;

  return (
    <div className="page-container">
      {workers.map(worker => (
        <div key={worker._id} className="profile-card">
          <h2 className="profile-title">👷 My profile</h2>
          <div className="profile-details">
            <p><strong>👤 Name:</strong> {worker.name}</p>
            <p><strong>📞 Phone:</strong> {worker.phone}</p>
            <p><strong>📍 Address:</strong> {worker.address}</p>
            <p><strong>💼 Work Type:</strong> {worker.workertype}</p>
            <p><strong>📅 Availability:</strong> {worker.availability}</p>
            <p><strong>✅ Status:</strong> {worker.status}</p>
          </div>
          <button
            className="delete-button"
            onClick={() => deleteWorker(worker._id)}
          >
            Delete This Worker Profile
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyWorkerPage;
