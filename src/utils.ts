import * as THREE from 'three';
import { element } from 'three/tsl';



export function printObjInfo(scene: THREE.Scene) {
  scene.traverse((obj) => {

    // console.log(obj.type, ": ", obj.name);

    if (obj instanceof THREE.PointLight) {
      obj.intensity = 4;

    }


    // if (obj.name === "Window_Top") {
    //
    //   obj.children.forEach(element => {
    //     console.log(element.material);
    //
    //     
    //   });
    //
    //   console.log("Windows material:");
    //
    // }

    // if(obj.name === "iframe_reference" && obj instanceof THREE.Mesh) {
    //   obj.material = obj.material.clone();
    //   obj.material.color.set(0xff0000);
    //   obj.material.needsUpate = true;
    //   return;
    // }

  });
}
