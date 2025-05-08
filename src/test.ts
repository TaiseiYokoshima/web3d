import * as THREE from 'three';

import { CSS3DRenderer, CSS3DObject, OrbitControls} from 'three/examples/jsm/Addons.js';

export function run() {
  // camera and scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);



  // 3d css renderer
  const cssRender = new CSS3DRenderer();
  cssRender.setSize(window.innerWidth, window.innerHeight);
  cssRender.domElement.style.position = 'absolute';
  cssRender.domElement.style.top = '0';
  document.body.appendChild(cssRender.domElement);


  // orbit control
  const control = new OrbitControls(camera, cssRender.domElement);
  control.enableDamping = true;


  // 3d css object
  const test_div = document.createElement("div");
  test_div.innerText = 'Hello World';
  test_div.style.background = 'black';
  test_div.style.color = 'red';
  const obj = new CSS3DObject(test_div);


  scene.add(camera);
  scene.add(obj);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    cssRender.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    control.update();
    cssRender.setSize(window.innerWidth, window.innerHeight);
    cssRender.render(scene, camera);
  };

  animate();

};
