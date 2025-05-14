import styles from './Button.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getTopLevelRoute } from '../Utils';

import MenuContext from "./context";
import { switchToAbout, switchToModels, switchToShow } from 'Render';


interface NavButtonProps {
  targetPage: string; 
  children: React.ReactNode;
  sceneSwitch: () => void,
}



function NavButton( { targetPage, children, sceneSwitch }: NavButtonProps) {
  const context = useContext(MenuContext)!;
  const page = useLocation();
  const [currentPage, setPage] = useState<string>(getTopLevelRoute(page.pathname));
  const navigate = useNavigate();

  const onClick = () => {
    context.closeMenu();
    navigate(targetPage);
    sceneSwitch();
  };

  useEffect(() => {
    if (currentPage === getTopLevelRoute(page.pathname)) return;
    setPage(page.pathname);
  }, [page]);

  const className = `
    ${styles.base} 
    ${ (targetPage === currentPage) ? styles.current : styles.selectable}
  `;

  const navButton = 
    <button onClick={onClick} className={className}>
      { children }
    </button>;

  return (navButton);
};


type ButtonProps = Omit<NavButtonProps, 'targetPage'>;
function generic(props: ButtonProps, target: string) {
  let callback = () => {};

  if (target === "/about") callback = switchToAbout;
  else if (target === "/show") callback = switchToShow;
  else if (target === "/models") callback = switchToModels;
  else console.error("mistached target page in generic button generation");


  const navButtonProps: NavButtonProps = {
    ...props,
    targetPage: target,
    sceneSwitch: callback
    
  };

  return(
    <NavButton {...navButtonProps} />
  );
}


export function About(props: ButtonProps) {
  return(generic(props, '/about'));
}

export function Models(props: ButtonProps) {
  return(generic(props, '/models'));
}

export function Show(props: ButtonProps) {
  return(generic(props, '/show'));
}
