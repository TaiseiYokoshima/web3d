import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

import { remapOrbitControls } from './variables';
import { showCamera, modelsCamera } from './camera';
import { showRenderer, modelsRenderer } from './renderers';


const maps = {
  LEFT: THREE.MOUSE.PAN,
  MIDDLE: THREE.MOUSE.ROTATE,
  RIGHT: THREE.MOUSE.DOLLY
};


const showControls = new OrbitControls(showCamera, showRenderer.domElement);
showControls.enableDamping = true;
if (remapOrbitControls) showControls.mouseButtons = maps;


const modelsControls = new OrbitControls(modelsCamera, modelsRenderer.domElement);
modelsControls.enableDamping = true;
if (remapOrbitControls) modelsControls.mouseButtons = maps;


export { showControls, modelsControls };


