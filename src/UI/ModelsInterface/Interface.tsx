import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTopLevelRoute } from "../Utils";
import { getCurrentModel, nextModel, previousModel, resetModelCamera, toggleWireframe } from "Render";

import styles from "./Interface.module.css";

export default function Interface() {
  const location = useLocation();
  const [page, setPage] = useState<string>(getTopLevelRoute(location.pathname));
  const [model, setModel] = useState<string>(getCurrentModel());

  useEffect(() => {
    setPage(getTopLevelRoute(location.pathname));
  }, [location]);


  const next = () => {
    nextModel();
    setModel(getCurrentModel());
  };

  const previous = () => {
    previousModel();
    setModel(getCurrentModel());
  };


  const current = () => {

  }

  return (page !== "/models") ? null : (
    <>

      <div onClick={previous} className={styles.previous}>
        &lt;
      </div>

      <div className={styles.current}>
        { model }
      </div>
      
      <div onClick={resetModelCamera} className={styles.reset}>
        Reset Camera
      </div>


      <div onClick={toggleWireframe} className={styles.wireFrame}>
        Toggle Wireframe
      </div>

      <div onClick={next} className={styles.next}>
        &gt;
      </div>
    
    </>
  );
}
