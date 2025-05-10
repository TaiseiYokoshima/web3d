import styles from "./Panel.module.css";
import Closer from "./Closer";
import { About, Scene, Models } from "./Button";
import MenuContext from "./context";

import { useContext } from "react";


interface MenuProps {
  transitionDuration: string;
}


export default function MenuPanel( { transitionDuration }: MenuProps ) {
  const context = useContext(MenuContext)!;
  return (
    <div
      ref={context.menu}
      className={styles.menu}
      style={{ transition: `left ${transitionDuration}s ease`}}
      > 

      <Closer onClick={context.closeMenu} />

      <div className={styles.listDiv}>
        
         <Scene>
           Scene
         </Scene>

         <Models>
           Models
         </Models>

         <About>
           About
         </About>

       </div>

    </div>

  );
};
