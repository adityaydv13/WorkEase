// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './frontend/Home';
// import Navbar from './frontend/Navbar';
// import Login from './frontend/pages/Login';
// import Register from './frontend/pages/Register';
// import AddWorker from './frontend/pages/AddWorker';
// import SearchWorker from './frontend/pages/SearchWorker';
// import ForgotPassword from './frontend/pages/ForgotPassword';
// import ResetPassword from './frontend/pages/ResetPassword';
// import Myhires from './frontend/pages/Myhires';
// import ContactForm from './frontend/pages/ContactForm';
// import WorkerCategoryPage from './frontend/pages/CategoryPage';
// import MyWorkerPage from './frontend/pages/Myworker';

// <Route path="/worker-category/:categoryName" element={<WorkerCategoryPage />} />

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // On mount, check if token exists
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) setIsLoggedIn(true);
//   }, []);

//   return (
//     <Router>
//       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//       <Routes>
       

//         {/* Public routes */}
//         <Route path="/home" element={<Home />} />
//         <Route
//           path="/login"
//           element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
//         />
//          {/* <Route path="/home" element={<h2>Welcome to Workora</h2>} /> */}
//         <Route
//           path="/register"
//           element={isLoggedIn ? <Navigate to="/" /> : <Register />}
//         />
//         <Route path="/worker-category/:categoryName" element={<WorkerCategoryPage />} />

//         {/* Protected routes can be added here */}
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />

// {/* delete myself as worker  */}

//        <Route path="/my-worker" element={<MyWorkerPage />} />

//           <Route path="/my-hires" element={<Myhires />} />
           
//            {/* query sending route  */}
//             <Route path="/contact" element={<ContactForm />} />

//        {/* <Route path="/my-worker" element={<MyWorkerPage />} /> */}


//           <Route path="/add-worker" element={isLoggedIn ? <AddWorker /> : <Navigate to="/login" />} />
//           <Route path="/search-worker" element={isLoggedIn ? < SearchWorker/> : <Navigate to="/login" />} />
//         {/* Redirect any unknown route to login if not logged in */}
//         <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
//       </Routes>
      
//     </Router>
//   );
// };

// export default App;


//************************ */ aboove one is also correct except that it does not lgging out when the tab or browser is closed.

//  import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './frontend/Home';
// import Navbar from './frontend/Navbar';
// import Login from './frontend/pages/Login';
// import Register from './frontend/pages/Register';
// import AddWorker from './frontend/pages/AddWorker';
// import SearchWorker from './frontend/pages/SearchWorker';
// import ForgotPassword from './frontend/pages/ForgotPassword';
// import ResetPassword from './frontend/pages/ResetPassword';
// import Myhires from './frontend/pages/Myhires';
// import ContactForm from './frontend/pages/ContactForm';
// import WorkerCategoryPage from './frontend/pages/CategoryPage';
// import MyWorkerPage from './frontend/pages/Myworker';

// const INACTIVITY_LIMIT = 15 * 60 * 1000;

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   let logoutTimer;

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedIn(true);
//       startInactivityTimer();
//     }

//     const resetTimer = () => {
//       clearTimeout(logoutTimer);
//       startInactivityTimer();
//     };

//     function startInactivityTimer() {
//       logoutTimer = setTimeout(() => {
//         localStorage.removeItem('token');
//         setIsLoggedIn(false);
//         alert('You have been logged out due to inactivity.');
//       }, INACTIVITY_LIMIT);
//     }

//     // Listen to user interactions
//     window.addEventListener('mousemove', resetTimer);
//     window.addEventListener('keydown', resetTimer);
//     window.addEventListener('click', resetTimer);
//     window.addEventListener('scroll', resetTimer);

//     return () => {
//       clearTimeout(logoutTimer);
//       window.removeEventListener('mousemove', resetTimer);
//       window.removeEventListener('keydown', resetTimer);
//       window.removeEventListener('click', resetTimer);
//       window.removeEventListener('scroll', resetTimer);
//     };
//   }, []);

//   return (
//     <Router>
//       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//       <Routes>
//         {/* Public routes */}
//         <Route path="/home" element={<Home />} />
//         <Route
//           path="/login"
//           element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
//         />
//         <Route
//           path="/register"
//           element={isLoggedIn ? <Navigate to="/" /> : <Register />}
//         />
//         <Route path="/worker-category/:categoryName" element={<WorkerCategoryPage />} />

//         {/* Protected routes */}
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         <Route path="/my-worker" element={<MyWorkerPage />} />
//         <Route path="/my-hires" element={<Myhires />} />
//         <Route path="/contact" element={<ContactForm />} />
//         <Route path="/add-worker" element={isLoggedIn ? <AddWorker /> : <Navigate to="/login" />} />
//         <Route path="/search-worker" element={isLoggedIn ? <SearchWorker /> : <Navigate to="/login" />} />

//         {/* Redirect unknown routes */}
//         <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;







import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './frontend/Home';
import Navbar from './frontend/Navbar';
import Login from './frontend/pages/Login';
import Register from './frontend/pages/Register';
import AddWorker from './frontend/pages/AddWorker';
import SearchWorker from './frontend/pages/SearchWorker';
import ForgotPassword from './frontend/pages/ForgotPassword';
import ResetPassword from './frontend/pages/ResetPassword';
import Myhires from './frontend/pages/Myhires';
import ContactForm from './frontend/pages/ContactForm';
import WorkerCategoryPage from './frontend/pages/CategoryPage';
import MyWorkerPage from './frontend/pages/Myworker';

const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutTimerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      startInactivityTimer();
    }

    const resetTimer = () => {
      clearTimeout(logoutTimerRef.current);
      startInactivityTimer();
    };

    function startInactivityTimer() {
      logoutTimerRef.current = setTimeout(() => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        alert('You have been logged out due to inactivity.');
      }, INACTIVITY_LIMIT);
    }

    // Activity events
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    return () => {
      clearTimeout(logoutTimerRef.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Public routes */}
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/worker-category/:categoryName" element={<WorkerCategoryPage />} />
        {/* <Route path="/worker-category/:categoryName" element={isLoggedIn ? <WorkerCategoryPage /> : <Navigate to="/login" />} /> */}


        {/* Protected & Utility routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/my-worker" element={<MyWorkerPage />} />
        <Route path="/my-hires" element={<Myhires />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/add-worker" element={isLoggedIn ? <AddWorker /> : <Navigate to="/login" />} />
        <Route path="/search-worker" element={isLoggedIn ? <SearchWorker /> : <Navigate to="/login" />} />

        {/* Default route */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
