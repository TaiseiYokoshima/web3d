import * as THREE from 'three';

import { cameraPosition, cameraLookAt } from './variables';


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(...cameraPosition);
camera.lookAt(...cameraLookAt);

const modelsCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(...cameraPosition);
camera.lookAt(...cameraLookAt);

export { camera, modelsCamera };
