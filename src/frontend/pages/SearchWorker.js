import axios from 'axios';
import {useState} from 'react';
import '../styles/Search.css'; // Import the CSS
const SearchWorker = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const hireWorker = async (workerId) => {
        try {
                

            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:5000/api/workers/hire/${workerId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            if (response.status === 200) {
                alert('Worker hired successfully');
            } else {
                alert('Failed to hire worker');
            }
        } catch (err) {
            console.error(err);
            alert('Error hiring worker');
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response =await axios.get(`http://localhost:5000/api/workers?search=${searchTerm}`);
               setWorkers(response.data);
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
    <div className="search-worker-container">
        <h2>Search for Workers</h2>
        <form className="search-worker-form" onSubmit={handleSearch}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter name or skill like: plumber, electrician, etc."
            />
            <button type="submit">Search</button>
        </form>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {workers.length > 0 && (
            <div className="worker-list">
                {workers.map((worker) => (
                    <div key={worker._id} className="worker-card">
                        <div className="worker-info">
                            <strong>{worker.name}</strong> <br />
                            Skill: {worker.workertype} <br />
                            Availability: {worker.availability} days <br />
                            Status: {worker.status}
                        </div>
                        <div className="worker-buttons">
                            <button className="hire-btn" onClick={() => hireWorker(worker._id)}>Hire</button>
                            {/* <button className="delete-btn" onClick={() => deleteWorker(worker._id)}>Delete</button> */}
                        </div>
                    </div>
                ))}
            </div>
        )}
        {!loading && workers.length === 0 && !error && <p>No workers found.</p>}
    </div>
);
 
}
export default SearchWorker;

 