import { OrbitControls, CSS3DRenderer } from 'three/examples/jsm/Addons.js';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import * as THREE from 'three';

const remap = true;

const maps = {
  LEFT: THREE.MOUSE.PAN,
  MIDDLE: THREE.MOUSE.ROTATE,
  RIGHT: THREE.MOUSE.DOLLY
};

export function generateGLOrbit(camera: PerspectiveCamera, renderer: WebGLRenderer): OrbitControls { 
  const render = new OrbitControls(camera, renderer.domElement);
  render.enableDamping = true;

  if (remap) render.mouseButtons = maps;
  return render;
}



export function generateCSSOrbit(camera: PerspectiveCamera, renderer: CSS3DRenderer): OrbitControls { 
  const render = new OrbitControls(camera, renderer.domElement);
  render.enableDamping = true;
  if (remap) render.mouseButtons = maps;
  return render;
}






