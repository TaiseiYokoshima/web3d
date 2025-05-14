import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import styles from "./Loader.module.css";

import { showScene, loadScene, switchToAbout, switchToShow, switchToModels, modelsScene } from "Render";
import { useLocation } from "react-router-dom";
import { getTopLevelRoute } from "../Utils";
import { initialize, initiazlieDefault } from "src/render/models";





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
  


function handleURL(url: string): THREE.Scene | null {
  const topLevel = getTopLevelRoute(url);

  if (topLevel === "/about") {
    switchToAbout();
    return null;
  }

  else if (topLevel === "/show") {
    switchToShow();
    return showScene;
  }

  else if (topLevel === "/models") {
    switchToModels();
    return modelsScene;
  }

  console.error("did not match against a path in loader component");
  return null;
}


export default function Loader() {
  const [percentage, setPercentage] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);
  const ref = useRef(null);
  const page = useLocation();
  

  const update = (current: number) => {
    if (!ref.current) {
      console.log("called update after unmounted");
      return;
    }

    setPercentage(current);
  }


  useEffect(() => {

    const load = async () => {

      
      await loadScene(update); 
      const scene = handleURL(page.pathname);
      initiazlieDefault();

      // if (scene) {
      //   let promiseList = checkModelVisibility(showScene);
      //   await Promise.all(promiseList);
      // }

      setComplete(true);
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
