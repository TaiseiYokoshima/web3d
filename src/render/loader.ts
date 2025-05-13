import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from 'three';


import { findReference } from "./monitor";

import { showScene } from "./scenes";
import { collectModels } from "./models";


type LoadDisplayer = (percentage: number) => void;
export default async function loadScene(display: LoadDisplayer) {
  return new Promise<void>((resolve, reject) => {

    const loader = new GLTFLoader();

    loader.load('scene.glb',
      (gltf) => { 
        const assets = gltf.scene;
        showScene.add(assets);
      
        collectModels(gltf.scene);
        resolve();
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



