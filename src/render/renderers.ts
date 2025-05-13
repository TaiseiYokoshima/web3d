import * as THREE from 'three';

import { showLayer, modelsLayer, background } from './variables';


// main scene webgl renderer
const showRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
showRenderer.setClearColor(background);
showRenderer.setSize(window.innerWidth, window.innerHeight, true);
showRenderer.domElement.style.position = 'absolute';
showRenderer.domElement.style.top = '0';
showRenderer.domElement.id = "glScene";
showRenderer.domElement.style.zIndex = showLayer;

// models scene webgl renderer
const modelsRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
modelsRenderer.setClearColor(background);
modelsRenderer.setSize(window.innerWidth, window.innerHeight, true);
modelsRenderer.domElement.style.position = 'absolute';
modelsRenderer.domElement.style.top = '0';
modelsRenderer.domElement.id = "modelsScene";
modelsRenderer.domElement.style.zIndex = modelsLayer;



const threeDiv = document.getElementById('three');
if (threeDiv) { 
  threeDiv.appendChild(showRenderer.domElement); 
  threeDiv.appendChild(modelsRenderer.domElement); 
} else console.log("could not find div");



export { showRenderer, modelsRenderer };
