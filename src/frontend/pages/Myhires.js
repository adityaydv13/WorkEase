// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/myhires.css'; // Import the CSS

// const Myhires = ({ refreshToggle }) => {
//   const [hiredWorkers, setHiredWorkers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchHiredWorkers = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/hires`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setHiredWorkers(response.data.hires);
//     } catch (err) {
//       console.error('Error fetching hires:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteWorker = async (hireId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/hires/${hireId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         alert('Hire deleted successfully');
//         setHiredWorkers(prev => prev.filter(h => h._id !== hireId));
//       } else {
//         alert('Failed to delete hire');
//       }
//     } catch (err) {
//       console.error('Error deleting hire:', err.response || err.message || err);
//       alert(`Error deleting hire: ${err.response?.data?.message || err.message || 'Unknown error'}`);
//     }
//   };

//   useEffect(() => {
//     fetchHiredWorkers();
//   }, [refreshToggle]);

//   return (
//     <div className="myhires-container">
//       <h2 className="myhires-title">My Hired Workers</h2>
//       {loading ? (
//         <p className="myhires-loading">Loading...</p>
//       ) : hiredWorkers.length === 0 ? (
//         <p className="myhires-empty">No hired workers found.</p>
//       ) : (
//         <div className="myhires-grid">
//           {hiredWorkers.map((hire) => (
//             <div key={hire._id} className="myhires-card">
//               <h4>{hire.workerId?.name || 'Unnamed Worker'}</h4>
//               <p><strong>Skill:</strong> {hire.workerId?.workertype}</p>

//                 <p><strong>Phone:</strong> {hire.workerId?.phone}</p>

//               <p><strong>Status:</strong> {hire.status}</p>
//                <p><strong>Hired On:</strong> {new Date(hire.hireDate).toLocaleDateString()}</p>
//               <button className="delete-btn" onClick={() => deleteWorker(hire._id)}>Delete</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Myhires;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/myhires.css"; // Import the CSS

const Myhires = ({ refreshToggle }) => {
  const [hiredWorkers, setHiredWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRatings, setUserRatings] = useState({});

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");

  const fetchHiredWorkers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/hires`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHiredWorkers(response.data.hires);
    } catch (err) {
      console.error("Error fetching hires:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorker = async (hireId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/hires/${hireId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Hire deleted successfully");
        setHiredWorkers((prev) => prev.filter((h) => h._id !== hireId));
      } else {
        alert("Failed to delete hire");
      }
    } catch (err) {
      console.error("Error deleting hire:", err.response || err.message || err);
      alert(
        `Error deleting hire: ${
          err.response?.data?.message || err.message || "Unknown error"
        }`
      );
    }
  };

  const rateWorker = async (workerId, stars) => {
    if (!userId) {
      alert("Please log in to rate a worker.");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/ratings/${workerId}/rate`,
        {
          userId,
          stars,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUserRatings((prev) => ({ ...prev, [workerId]: stars }));
      alert("Rated successfully");
    } catch (err) {
      console.error("Rating error:", err.response?.data || err.message);
      alert("Failed to rate the worker.");
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
          {hiredWorkers.map((hire) => {
            const worker = hire.workerId;
            const rating = worker?._id ? userRatings[worker._id] || 0 : 0;

            return (
              <div key={hire._id} className="myhires-card">
                <h4>{worker?.name || "Unnamed Worker"}</h4>
                <p>
                  <strong>Skill:</strong> {worker?.workertype || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong> {worker?.phone || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {hire.status}
                </p>
                <p>
                  <strong>Hired On:</strong>{" "}
                  {new Date(hire.hireDate).toLocaleDateString()}
                </p>

                {hire.status === "accepted" && worker?._id && (
                  <div>
                    <p>
                      <strong>Rate this Worker:</strong>
                    </p>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => rateWorker(worker._id, star)}
                        style={{
                          fontSize: rating >= star ? "26px" : "20px",
                          color: rating >= star ? "gold" : "gray",
                          cursor: "pointer",
                          background: "none",
                          border: "none",
                          textShadow: rating >= star ? "0 0 8px gold" : "none",
                          transition: "all 0.2s ease-in-out",
                        }}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteWorker(hire._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Myhires;
