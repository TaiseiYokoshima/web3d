import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import styles from "./Loader.module.css";

import { showScene, loadScene } from "Render";


function checkModelVisibility(scene: THREE.Scene): Promise<void>[] {
  const renderedList: Promise<void>[] = [];

  const traverseAndCollectPromises = (obj: THREE.Object3D) => {
    if (!(obj instanceof THREE.Mesh)) return;

    const promise = new Promise<void>(resolve => {

      obj.onAfterRender = () => {
        resolve();
        obj.onAfterRender = () => {};
      };
    });

    renderedList.push(promise);
  };

  scene.traverse(traverseAndCollectPromises);
  return renderedList;
}
  


export default function Loader() {
  const [percentage, setPercentage] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);
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
      const objMap =  await loadScene(update) 
      let promiseList = checkModelVisibility(showScene);

      await Promise.all(promiseList);
      setComplete(true);
      return objMap;
    };


    load();

  }, []);

  if (complete) {
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
