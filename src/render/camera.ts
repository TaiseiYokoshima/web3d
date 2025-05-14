import * as THREE from 'three';

import { cameraPosition, cameraLookAt } from './variables';


const showCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
showCamera.position.set(...cameraPosition);
showCamera.lookAt(...cameraLookAt);

const modelsCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
modelsCamera.position.set(...cameraPosition);
modelsCamera.lookAt(...cameraLookAt);


export function resetModelCamera() {
  modelsCamera.position.set(...cameraPosition);
  modelsCamera.lookAt(...cameraLookAt);
};

export { showCamera,  modelsCamera };
