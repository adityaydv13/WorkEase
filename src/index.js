import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { RequestsProvider } from "./contexts/RequestsContext"; // Import the RequestsProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RequestsProvider> {/* ✅ Wrap App here */}
      <App />
    </RequestsProvider>
  </React.StrictMode>
  
);

 
reportWebVitals();
