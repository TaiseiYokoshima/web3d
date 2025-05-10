import styles from './Button.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import MenuContext from "./context";

function getTopLevelRoute(path: string): string {
  if (path === "/") return "/scene";

  const toplevel = path.split("/").filter(Boolean)[0] || "";
  return "/" + toplevel;
}

interface NavButtonProps {
  targetPage: string; 
  children: React.ReactNode;
}


function NavButton( { targetPage, children }: NavButtonProps) {
  const context = useContext(MenuContext);
  const page = useLocation();
  const [currentPage, setPage] = useState<string>(getTopLevelRoute(page.pathname));
  const navigate = useNavigate();

  const onClick = () => {
    context.closeMenu();
    navigate(targetPage);
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
  const navButtonProps: NavButtonProps = {
    ...props,
    targetPage: target,
  };

  return(
    <NavButton {...navButtonProps} />
  );
}


export function About(progs: ButtonProps) {
  return(generic(progs, '/about'));
}

export function Models(progs: ButtonProps) {
  return(generic(progs, '/models'));
}

export function Scene(progs: ButtonProps) {
  return(generic(progs, '/scene'));
}
