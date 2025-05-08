import styles from "./Panel.module.css";

import Closer from "./Closer";

import { About, Scene, Models } from "./Button";

import { Page } from "../Imports"; 


interface MenuProps {
  isOpen: boolean;
  transitionDuration: string;
  currentPage: Page;
  menuToggle: () => void;
  setPage: (page: Page) => void;
}

export default function MenuPanel( { isOpen, transitionDuration, currentPage, menuToggle, setPage }: MenuProps ) {

  return (
    <div 
      onClick={menuToggle} 
      className={`${styles.menu} ${isOpen ? styles.open : ''} `} 
      style={{ transition: `left ${transitionDuration}s ease`}}
      > 

      <Closer onClick={menuToggle} isOpen={isOpen} />

      <div className={styles.listDiv}>
        
         <Scene changePage={setPage} currentPage={currentPage}>
           Scene
         </Scene>

         <Models changePage={setPage} currentPage={currentPage}>
           Models
         </Models>

         <About changePage={setPage} currentPage={currentPage}>
           About
         </About>

       </div>

    </div>

  );
};
