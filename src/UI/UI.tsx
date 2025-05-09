import React, { useState, useContext } from 'react';
import { createRoot } from 'react-dom/client';

import { MenuPanel, MenuOpener }  from './Menu';

import { Page, menuTransitionDuration } from './Imports';

import Loader from './Loader/loader';


import * as THREE from "three";


function App({ scene }: { scene: THREE.Scene }) {


  const duration = menuTransitionDuration;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [page, setPage] = React.useState<Page>(Page.Scene);

  const handleMenuToggle = () => {
    console.log("menu toggled");
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <MenuOpener onClick={handleMenuToggle} isOpen={isMenuOpen} transitionDuration={duration} />
      <MenuPanel currentPage={page} menuToggle={handleMenuToggle} setPage={setPage} isOpen={isMenuOpen} transitionDuration={duration} />
    </>
  );
}






export function initUI(scene: THREE.Scene) {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.top = "0";
  div.style.zIndex = '10';
  div.style.width = "100vw";
  div.id = "react-root";

  const loader = document.createElement('div');
  loader.style.position = 'absolute';
  loader.style.top = "0";
  // loader.style.zIndex = '100';
  // loader.style.width = "100vw";
  loader.style.height = "100vh";
  loader.id = "loader";

  document.body.appendChild(loader);

  const loaderRoot = createRoot(loader);
  loaderRoot.render(<Loader scene={scene} />);

  document.body.appendChild(div);

  const root = createRoot(div);
  root.render(<App scene={scene} />);
}

