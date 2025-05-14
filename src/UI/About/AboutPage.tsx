import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTopLevelRoute } from "../Utils";
import styles from "./AboutPage.module.css"

import { Architecture, Assessment, Github, SOO, Technologies, Testing } from "./Sections";


interface ChildProps {
  children: React.ReactNode,
}

function Title() {
  return (
    <div className={styles.title}>
      About
    </div>
  );
}


function ScrollSection({ children }: ChildProps) {
  return (
    <div className={styles.scrollSection}>
      { children } 
    </div>
  );
}




export default function AboutPage() {
  const location = useLocation();
  const [page, setPage] = useState<string>(getTopLevelRoute(location.pathname));
  useEffect(() => {
    setPage(getTopLevelRoute(location.pathname));
  }, [location]);



  return (page !== "/about") ? null : (
    <div className={styles.container}>
      <ScrollSection>  

        <Title/>
        <Github/>
        <Technologies/>
        <Architecture/>
        <Testing/>
        <Assessment/>

        <SOO/>

      </ScrollSection>
    </div>
  );
}
