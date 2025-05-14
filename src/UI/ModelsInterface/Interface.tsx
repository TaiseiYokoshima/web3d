import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTopLevelRoute } from "../Utils";
import { getCurrentModel, nextModel, previousModel } from "Render";

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
        Previous
      </div>

      <div className={styles.current}>
        { model }
      </div>
      
      <div onClick={next} className={styles.next}>
        Next
      </div>
    
    </>
  );
}
