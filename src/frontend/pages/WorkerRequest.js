import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles//WorkerRequest.css"; // Assuming you have a CSS file for styling
const WorkerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const workerId = localStorage.getItem("workerId"); // or get from context

//  useEffect(() => {
//   if (!workerId) {
//     alert("Worker ID is not available in localStorage");
//     setLoading(false);
//     return;
//   }

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/api/hire/requests/${workerId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setRequests(res.data);
//     } catch (err) {
//       console.error("Failed to fetch requests:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchRequests();
// }, [workerId, token]);

useEffect(() => {
  const fetchRequests = async () => {
    try {
      const workersRes = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/worker/my-worker`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const workers = workersRes.data;

      if (!workers.length) {
        alert("You are not registered as a worker.");
        setRequests([]);
        return;
      }

      // For each of your own workers, get hire requests
      const allRequests = [];

      for (const worker of workers) {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/hire/requests/${worker._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        allRequests.push(...res.data);
      }

      setRequests(allRequests);
    } catch (err) {
      console.error("Failed to fetch worker requests:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  fetchRequests();
}, [token]);


  const handleResponse = async (requestId, status) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/hire/respond/${requestId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`Request ${status}`);
      setRequests((prev) =>
        prev.filter((req) => req._id !== requestId)
      ); // Remove after action
    } catch (err) {
      alert("Error updating request");
      console.error(err);
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (requests.length === 0) return <p id="page-heading">No pending hire requests.</p>;

 return (
  <div className="worker-requests-container">
    <h2>Pending Hire Requests</h2>
    {requests.map((req) => (
      <div key={req._id} className="request-card">
        <p><strong>User:</strong> {req.userId?.name || "Unknown"}</p>
        <p><strong>Location:</strong> {req.location || "N/A"}</p>

        {/* ✅ Skill/Workertype */}
        <p><strong>Skill:</strong> {req.skill || req.workertype || "N/AA"}</p>

<p><strong>Requested on:</strong> {new Date(req.hireDate).toLocaleString('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
})}</p>
        <div className="request-buttons">
          <button onClick={() => handleResponse(req._id, "accepted")} className="accept-btn">Accept</button>
          <button onClick={() => handleResponse(req._id, "rejected")} className="reject-btn">Reject</button>
        </div>
      </div>
    ))}
  </div>
);

};

export default WorkerRequests;
