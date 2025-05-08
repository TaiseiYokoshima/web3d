import styles from './Closer.module.css';

interface CloserProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function Closer( { onClick, isOpen }: CloserProps ) {

  return (
    <div className={styles.closerDiv}>
      <label onClick={onClick} className={styles.closerLabel}>  
        <span></span>
        <span></span>
      </label> 

    </div>
  );

};

