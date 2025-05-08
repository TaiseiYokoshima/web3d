import styles from './Button.module.css';
import { Page } from '../Imports';

interface NavButtonProps {
  changePage: () => void;
  targetPage: Page; 
  currentPage: Page;
  children: React.ReactNode;
}

type ButtonProps = Omit<NavButtonProps, 'targetPage' | 'changePage'> & {
  changePage: (page: Page) => void;
};

function NavButton( {changePage, targetPage, currentPage, children }: NavButtonProps) {

  const className = `
    ${styles.base} 
    ${ (targetPage === currentPage) ? styles.current : styles.selectable}
  `;

  const navButton = 
    <button onClick={changePage} className={className}>
      { children }
    </button>;

  return (navButton);
};


function generic(props: ButtonProps, target: Page) {
  const navButtonProps: NavButtonProps = {
    ...props,
    targetPage: target,
    changePage: () => {
      props.changePage(target);
    }
    
  };

  return(
    <NavButton {...navButtonProps} />
  );

}


export function About(progs: ButtonProps) {
  return(generic(progs, Page.About));
}

export function Models(progs: ButtonProps) {
  return(generic(progs, Page.Models));
}

export function Scene(progs: ButtonProps) {
  return(generic(progs, Page.Scene));
}
