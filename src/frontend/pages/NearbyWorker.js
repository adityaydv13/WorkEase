 


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/NearbyWorker.css';

// const NearbyWorkers = () => {
//   const [workers, setWorkers] = useState([]);
//   const [location, setLocation] = useState(null);
//   const [locationNames, setLocationNames] = useState({}); // workerId => locationName

//   // 🔁 Reverse Geocode
//   const reverseGeocode = async (lat, lon) => {
//     const res = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
//     );
//     const data = await res.json();
//     return data.display_name;
//   };

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setLocation({ latitude, longitude });

//         const { data } = await axios.get('http://localhost:5000/api/workers/nearby', {
//           params: { lat: latitude, lng: longitude },
//         });

//         setWorkers(data);

//         // 🔁 Reverse geocode each worker location
//         const nameMap = {};
//         for (let worker of data) {
//           const [lng, lat] = worker.location.coordinates;
//           try {
//             const locName = await reverseGeocode(lat, lng);
//             nameMap[worker._id] = locName;
//           } catch {
//             nameMap[worker._id] = 'Unknown';
//           }
//         }
//         setLocationNames(nameMap);
//       },
//       (err) => {
//         console.error('Location access denied', err);
//       }
//     );
//   }, []);

//   return (
//     <div className="container">
//       <h2>Nearby Workers</h2>

//       {workers.length === 0 ? (
//         <p>No workers found nearby.</p>
//       ) : (
//         workers.map((w) => (
//           <div className="worker-card" key={w._id}>
//             <h4 className="worker-name">{w.name}</h4>
//             <p className="worker-info">Category: {w.workertype}</p>
//             <p className="location">
//               Location: {locationNames[w._id] || 'Loading...'}
//             </p>
//             <p className="worker-info">Phone: {w.phone}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default NearbyWorkers;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/NearbyWorker.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const NearbyWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [location, setLocation] = useState(null);
  const [locationNames, setLocationNames] = useState({}); // workerId => locationName

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

  const userIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
    iconSize: [32, 32],
  });

  const workerIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    iconSize: [32, 32],
  });

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

      {/* 🔽 MAP BELOW WORKER LIST */}
      {location && (
        <div style={{ height: '400px', marginTop: '20px' }}>
          <MapContainer center={[location.latitude, location.longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* User Marker */}
            <Marker position={[location.latitude, location.longitude]} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>

            {/* Worker Markers */}
            {workers.map((w) => {
              const [lng, lat] = w.location.coordinates;
              return (
                <Marker key={w._id} position={[lat, lng]} icon={workerIcon}>
                  <Popup>
                    {w.name} <br />
                    {w.workertype}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default NearbyWorkers;
