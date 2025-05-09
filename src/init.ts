import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/Addons.js';



// const gl_layer = '0';
const gl_layer = '1';

// const css_layer = '1';
const css_layer = '0';


export function init(): [THREE.Scene, THREE.Scene, THREE.PerspectiveCamera] {
  const scene = new THREE.Scene();
  const cssScene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 10, 3);
  camera.lookAt(0, 0, 0);


  return [ scene, cssScene, camera ];
};


const light_blue = 0x90d5ff;
const background = light_blue;

export function createGLRender() {
  const glRender = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  glRender.setClearColor(background);
  glRender.setSize(window.innerWidth, window.innerHeight, true);
  glRender.setSize(window.innerWidth, window.innerHeight);
  glRender.domElement.style.position = 'absolute';
  glRender.domElement.style.top = '0';
  glRender.domElement.style.zIndex = gl_layer;

  const appDiv = document.getElementById('app');

  if (appDiv) { 
    appDiv.appendChild(glRender.domElement); 
  } else console.log("could not find div");

  return glRender
}


export function createCSSRender() {

  const cssRender = new CSS3DRenderer();
  cssRender.setSize(window.innerWidth, window.innerHeight);
  cssRender.domElement.style.position = 'absolute';
  cssRender.domElement.style.top = '0';
  cssRender.domElement.style.zIndex = css_layer;

  const appDiv = document.getElementById('app');

  if (appDiv) { 
    appDiv.appendChild(cssRender.domElement); 
  } else console.log("could not find div");

  return cssRender
}









