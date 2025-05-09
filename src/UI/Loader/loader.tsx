import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { promise } from "../../main";

import styles from "./loader.module.css";

import { loadScene } from "../../room";

import { visible } from "../../room";

import { glRender, scenecamera } from "../../main";


export default function Loader({ scene } : { scene:  THREE.Scene }) {

  const [percentage, setPercentage] = useState<number>(0);

  const ref = useRef(null);
  

  const update = (current: number) => {
    if (!ref.current) {
      console.log("called update after unmounted");
      return;
    }
    
    setPercentage(current);
  }


  useEffect(() => {

    const load = async () => {
      const objMap =  await loadScene(scene, update) 
      await visible(glRender, scenecamera, scene);
      return objMap;

    };


    promise.value = load();

  }, []);

  if (percentage == 100) {
    console.log("finished loading");
    return null;

  }

  
  return (
    <div ref={ref} id="loader" className={styles.loaderDiv} >
      
        <div className={styles.bar}>
          <div className={styles.current} style={{width: `${percentage}%`}}/>
        </div>
     
    </div>
  );
}
