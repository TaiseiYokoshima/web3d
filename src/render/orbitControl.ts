import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

import { remapOrbitControls } from './variables';
import { camera, modelsCamera } from './camera';
import { glRenderer, cssRenderer, modelsRenderer } from './renderers';


const maps = {
  LEFT: THREE.MOUSE.PAN,
  MIDDLE: THREE.MOUSE.ROTATE,
  RIGHT: THREE.MOUSE.DOLLY
};


const glControls = new OrbitControls(camera, glRenderer.domElement);
glControls.enableDamping = true;
if (remapOrbitControls) glControls.mouseButtons = maps;


const cssControls = new OrbitControls(camera, cssRenderer.domElement);
cssControls.enableDamping = true;
if (remapOrbitControls) cssControls.mouseButtons = maps;


const modelsControls = new OrbitControls(modelsCamera, modelsRenderer.domElement);
modelsControls.enableDamping = true;
if (remapOrbitControls) modelsControls.mouseButtons = maps;


export { glControls, cssControls, modelsControls };


