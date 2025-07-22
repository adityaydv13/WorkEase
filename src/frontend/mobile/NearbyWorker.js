
// // removing this will have no effect on web functionality, but is necessary for mobile
// // to ensure that the app can access the user's location


// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import axios from 'axios';

// const requestLocationPermission = async () => {
//   if (Platform.OS === 'android') {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//     );
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   }
//   return true;
// };

// const NearbyWorkers = () => {
//   const [workers, setWorkers] = useState([]);
//   const [locationNames, setLocationNames] = useState({});

//   const reverseGeocode = async (lat, lon) => {
//     const res = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
//     );
//     const data = await res.json();
//     return data.display_name;
//   };

//   useEffect(() => {
//     const fetchLocationAndWorkers = async () => {
//       const hasPermission = await requestLocationPermission();
//       if (!hasPermission) return;

//       Geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;

//           const { data } = await axios.get('http://localhost:5000/api/workers/nearby', {
//             params: { lat: latitude, lng: longitude },
//           });

//           setWorkers(data);

//           const nameMap = {};
//           for (let worker of data) {
//             const [lng, lat] = worker.location.coordinates;
//             try {
//               const locName = await reverseGeocode(lat, lng);
//               nameMap[worker._id] = locName;
//             } catch {
//               nameMap[worker._id] = 'Unknown';
//             }
//           }
//           setLocationNames(nameMap);
//         },
//         (err) => console.warn('Location error:', err),
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     };

//     fetchLocationAndWorkers();
//   }, []);

//   return (
//     <ScrollView style={{ padding: 16 }}>
//       <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Nearby Workers</Text>
//       {workers.length === 0 ? (
//         <Text>No workers found nearby.</Text>
//       ) : (
//         workers.map((w) => (
//           <View key={w._id} style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}>
//             <Text>Name: {w.name}</Text>
//             <Text>Category: {w.workertype}</Text>
//             <Text>Location: {locationNames[w._id] || 'Loading...'}</Text>
//             <Text>Phone: {w.phone}</Text>
//           </View>
//         ))
//       )}
//     </ScrollView>
//   );
// };

// export default NearbyWorkers;
