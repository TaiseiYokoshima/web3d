import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import { MenuPanel, MenuOpener }  from './Menu';

import { Page, menuTransitionDuration } from './Imports';

function App() {


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


export function initUI() {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.top = "0";
  div.style.zIndex = '10';
  div.style.width = "100vw";
  div.id = "Navbar";

  document.body.appendChild(div);

  const root = createRoot(div);
  root.render(<App/>);
}

