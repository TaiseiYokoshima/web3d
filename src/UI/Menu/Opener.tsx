import styles from './Opener.module.css';
import { useContext }  from 'react';

import MenuContext from './context';

interface OpenerProps {
  transitionDuration: string;
}

export default function Opener( { transitionDuration }: OpenerProps ) {
  const context = useContext(MenuContext)!;

  return (
    <div 
      ref={context.opener}
      onClick={context.openMenu} 
      className={styles.opener}
      style={{
        transition: `opacity ${transitionDuration}s ease`
      }}
    >
      <label className={styles.openerLabel}> 
        <span></span>
        <span></span>
        <span></span>
      </label> 

    </div>
  );

};
