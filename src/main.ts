import * as THREE from 'three';
import React from 'react';


import { initUI } from './UI/UI';

import { init, createCSSRender, createGLRender } from "./init";
import { generateCSSOrbit, generateGLOrbit } from './orbitControl';

// import { os, iframe_div, iframe } from './os';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';


import { loadMonitor } from './monitor';
// import { loadMonitor } from './updatedOS';
import { loadRoom, loadScene } from './room';
import { contain } from 'three/src/extras/TextureUtils.js';


import { Models } from './models';


const [ scene, cssScene, camera ] = init();


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);



// const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong light
// directionalLight.position.set(5, 10, 7.5);
// scene.add(directionalLight);

const cssRender = createCSSRender();
let cssOrbit: OrbitControls | null = null;
cssOrbit = generateCSSOrbit(camera, cssRender);


const glRender = createGLRender();
let glOrbit: OrbitControls | null = null;
glOrbit = generateGLOrbit(camera, glRender);




// loadMonitor(scene);



const promsie = loadScene(scene);

let objMap = null;
try {
  objMap = await loadScene(scene);
} catch (error) {
  console.log("failed to load scene");
}





// import { loadOS, setOcclusion} from "./updatedOS";
//
// loadOS(scene);
// // setOcclusion(scene);


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  cssRender.setSize(window.innerWidth, window.innerHeight);
  // glRender.setSize(window.innerWidth, window.innerHeight, true);
  glRender.setSize(window.innerWidth, window.innerHeight);
}, true);

function animate() {
  requestAnimationFrame(animate);
  

  if (cssOrbit) cssOrbit.update();
  if (glOrbit) glOrbit.update();

  // cssRender.render(cssScene, camera);
  cssRender.render(scene, camera);
  glRender.render(scene, camera);
};

animate();
initUI();



