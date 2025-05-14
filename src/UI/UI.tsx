import React from 'react';
import { createRoot } from 'react-dom/client';
import Loader from './Loader';
import Interface from './ModelsInterface';


import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from './Menu';
import AboutPage from './About';


function App() {

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/scene" replace />} />
        </Routes>

        <Menu/>

        <Loader />


        <Interface />
        <AboutPage />


      </Router> 
    </React.StrictMode>
  );
}



export function initUI() {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.top = "0";
  div.style.zIndex = '10';
  div.style.width = "100vw";
  div.id = "react-root";
  document.body.appendChild(div);

  const root = createRoot(div);
  root.render(<App />);
}

