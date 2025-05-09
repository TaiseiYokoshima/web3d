import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from 'three';

import { printObjInfo } from "./utils";

import { findReference } from "./monitor";

import { Models } from "./models";

function collectModels(gltfTree:THREE.Group<THREE.Object3DEventMap>, objMap: Map<Models, THREE.Object3D>) {
  gltfTree.traverse((obj) => {

    if (obj.type !== "Object3D") return;

    const logEntryNotFound = () => console.error("Unmatched model found"); 
    const insertToMap = (key: Models, value: THREE.Object3D) => objMap.set(key, value);

    switch (obj.name)  {

      case Models.Room:
        insertToMap(Models.Room, obj);
      return;

      case Models.Bed:
        insertToMap(Models.Bed, obj);
        return;

      case Models.Desk:
        insertToMap(Models.Desk, obj);
        return;

      case Models.Monitor:
        insertToMap(Models.Monitor, obj);
        return;
      
      case Models.Chair:
        insertToMap(Models.Chair, obj);
        return;

      case Models.Lamp:
        insertToMap(Models.Lamp, obj);
        return;

      default:
        logEntryNotFound();
        return;
    }

  });


}


type LoadDisplayer = (percentage: number) => void;
export async function loadScene(scene: THREE.Scene, display: LoadDisplayer) {

  return new Promise<Map<Models, THREE.Object3D>>((resolve, reject) => {

    const loader = new GLTFLoader();
    const objMap = new Map<Models, THREE.Object3D>();

    loader.load('scene.glb',
      (gltf) => { 
        const monitor = gltf.scene;

        scene.add(monitor)
      
        collectModels(gltf.scene, objMap);
        printObjInfo(scene);
        findReference(scene);

        for (const key of objMap.keys()) console.log(key);
        resolve(objMap);

      },

      (xhr) => {
        display(xhr.loaded / xhr.total * 100);
      },


      (error) => {
        console.log(error);
        reject(error);
      }

    );

  })
};

export async function visible(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, scene: THREE.Scene) {
  return new Promise<void>((resolve, reject) => {
    requestAnimationFrame(() => {
      renderer.render(scene, camera);
      resolve();
    })
  });
}


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
