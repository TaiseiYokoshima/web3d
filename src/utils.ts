import * as THREE from 'three';
import { element } from 'three/tsl';



export function printObjInfo(scene: THREE.Scene) {
  scene.traverse((obj) => {

    // if (obj.type === "Object3D") {
    //   console.log(obj.type, ": ", obj.name);
    // }

    if (obj instanceof THREE.PointLight) {
      obj.intensity = 4;

    }

  });
}
