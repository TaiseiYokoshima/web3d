import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { promise } from "../../main";

import styles from "./loader.module.css";

import { loadScene } from "../../room";

import { visible } from "../../room";

import { glRender, scenecamera } from "../../main";

import { animate } from "../../main";

function waitForVisibility(objectList: THREE.Object3D[], scene: THREE.Scene, camera: THREE.PerspectiveCamera): Promise<void> {
  return new Promise((resolve, reject) => {

    const checkVisibility = () => {
      console.log("checking visibility");

      const frustum = new THREE.Frustum();
      frustum.setFromProjectionMatrix(camera.projectionMatrix);
  
      const matrix = new THREE.Matrix4();
      matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
      frustum.setFromProjectionMatrix(matrix);


      for (const object of objectList) {
        const isVisible = frustum.intersectsObject(object);


        if (isVisible)  continue;
        else {
          requestAnimationFrame(checkVisibility);
          return;
        }

        resolve();

      }
    };

    checkVisibility();
  });
}


export default function Loader({ scene } : { scene:  THREE.Scene }) {

  const [percentage, setPercentage] = useState<number>(0);

  const []


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
       

      
      await new Promise( resolve => setTimeout(resolve, 10000));

      // await waitForVisibility(Array.from(objMap.values()), scene, scenecamera);
      // await visible(glRender, scenecamera, scene);
      // animate()
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
