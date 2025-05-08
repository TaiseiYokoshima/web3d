import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from 'three';

import { printObjInfo } from "./utils";

import { findReference } from "./monitor";




export function loadRoom(scene: THREE.Scene) {
  const loader = new GLTFLoader();

  loader.load( 
    'scene.glb',
    (gltf) => { 
      const monitor = gltf.scene;
      scene.add(monitor)
    
      printObjInfo(scene);
      findReference(scene);


    },

    (xhr) => {
      // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },


    (error) => {
      console.error('An error happened', error);
      console.log(error);
      console.log("came here");
    }
  );
}
