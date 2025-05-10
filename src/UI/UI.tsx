import React, { useState, useContext, useRef, useEffect, RefObject } from 'react';
import { createRoot } from 'react-dom/client';

import { Page } from './imports';
import Loader from './Loader';


import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from './Menu';

import * as THREE from "three";




function App({ scene }: { scene: THREE.Scene }) {

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/scene" replace />} />
        </Routes>

        <Menu/>


      </Router> 
    </React.StrictMode>
  );
}






export function initUI(scene: THREE.Scene) {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.top = "0";
  div.style.zIndex = '10';
  div.style.width = "100vw";
  div.id = "react-root";

  document.body.appendChild(div);
  const root = createRoot(div);
  root.render(<App scene={scene} />);
}

