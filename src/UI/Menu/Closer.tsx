import styles from './Closer.module.css';

interface CloserProps {
  onClick: () => void;
}

export default function Closer( { onClick}: CloserProps ) {

  return (
    <div className={styles.closerDiv}>
      <label onClick={onClick} className={styles.closerLabel}>  
        <span></span>
        <span></span>
      </label> 

    </div>
  );

};

