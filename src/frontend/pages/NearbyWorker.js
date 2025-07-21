// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles//NearbyWorker.css';

// const NearbyWorkers = () => {
//   const [workers, setWorkers] = useState([]);
//   const [location, setLocation] = useState(null);
   
//                // **   to show real location name 
// const [locationName, setLocationName] = useState('');

// const reverseGeocode = async (lat, lon) => {
//   const res = await fetch(
//     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
//   );
//   const data = await res.json();
//   return data.display_name;
// };
//               // ** uptill here

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setLocation({ latitude, longitude });

//         // this one also for real name 
// const locName = await reverseGeocode(latitude, longitude);
//     setLocationName(locName);
//         // till here


//         const { data } = await axios.get('http://localhost:5000/api/workers/nearby', {
//           params: { lat: latitude, lng: longitude }
//         });

//         setWorkers(data);
//       },
//       (err) => {
//         console.error('Location access denied', err);
//       }
//     );
//   }, []);

//     return (
//   <div className="container">
//     <h2>Nearby Workers</h2>

//     {workers.length === 0 ? (
//       <p>No workers found nearby.</p>
//     ) : (
//       workers.map((w) => (
//         <div className="worker-card" key={w._id}>
//           <h4 className="worker-name">{w.name}</h4>
//           <p className="worker-info">Category: {w.workertype}</p>
//           {locationName && <p className="location">Location: {locationName}</p>}
//           <p className="worker-info">Phone: {w.phone}</p>
//         </div>
//       ))
//     )}
//   </div>
// );
// };

// export default NearbyWorkers;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/NearbyWorker.css';

const NearbyWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [location, setLocation] = useState(null);
  const [locationNames, setLocationNames] = useState({}); // workerId => locationName

  // 🔁 Reverse Geocode
  const reverseGeocode = async (lat, lon) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();
    return data.display_name;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });

        const { data } = await axios.get('http://localhost:5000/api/workers/nearby', {
          params: { lat: latitude, lng: longitude },
        });

        setWorkers(data);

        // 🔁 Reverse geocode each worker location
        const nameMap = {};
        for (let worker of data) {
          const [lng, lat] = worker.location.coordinates;
          try {
            const locName = await reverseGeocode(lat, lng);
            nameMap[worker._id] = locName;
          } catch {
            nameMap[worker._id] = 'Unknown';
          }
        }
        setLocationNames(nameMap);
      },
      (err) => {
        console.error('Location access denied', err);
      }
    );
  }, []);

  return (
    <div className="container">
      <h2>Nearby Workers</h2>

      {workers.length === 0 ? (
        <p>No workers found nearby.</p>
      ) : (
        workers.map((w) => (
          <div className="worker-card" key={w._id}>
            <h4 className="worker-name">{w.name}</h4>
            <p className="worker-info">Category: {w.workertype}</p>
            <p className="location">
              Location: {locationNames[w._id] || 'Loading...'}
            </p>
            <p className="worker-info">Phone: {w.phone}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default NearbyWorkers;
