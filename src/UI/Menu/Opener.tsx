import styles from './Opener.module.css';

interface OpenerProps {
  onClick: () => void;
  isOpen: boolean;
  transitionDuration: string;
}

export default function Opener( { onClick, isOpen, transitionDuration }: OpenerProps ) {

  return (
    <div 
      onClick={onClick} 
      className={` ${styles.opener} ${isOpen ? styles.open : ''} `} 
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
