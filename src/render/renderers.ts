import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/Addons.js';

import { webGLLayer, cssLayer, modelsLayer, background } from './variables';


// main scene webgl renderer
const glRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
glRenderer.setClearColor(background);
glRenderer.setSize(window.innerWidth, window.innerHeight, true);
glRenderer.domElement.style.position = 'absolute';
glRenderer.domElement.style.top = '0';
glRenderer.domElement.id = "glScene";
glRenderer.domElement.style.zIndex = webGLLayer;


// main scene css renderer
const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
cssRenderer.domElement.id = "cssScene";
cssRenderer.domElement.style.zIndex = cssLayer;

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
  threeDiv.appendChild(glRenderer.domElement); 
  threeDiv.appendChild(cssRenderer.domElement); 
  threeDiv.appendChild(modelsRenderer.domElement); 
} else console.log("could not find div");



export { glRenderer, cssRenderer, modelsRenderer };
