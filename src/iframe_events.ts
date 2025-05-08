import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/Addons.js';



export function setIframeMouseEvent(
  camera: THREE.PerspectiveCamera, 
  iframe_mesh: THREE.Mesh,
  glRender: THREE.WebGLRenderer,
  cssRender: CSS3DRenderer
) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener('pointerdown', (e) => {
    // Normalize mouse coords
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObject(iframe_mesh, true);

    if (hits.length > 0) {
      glRender.domElement.style.pointerEvents = 'auto';
      cssRender.domElement.style.pointerEvents = 'none';
    } else {
      glRender.domElement.style.pointerEvents = 'none';
      cssRender.domElement.style.pointerEvents = 'auto';
    }

    const restore = () => {
      glRender.domElement.style.pointerEvents = 'auto';
      cssRender.domElement.style.pointerEvents = 'auto';
      window.removeEventListener('pointerup', restore);
    };

    window.addEventListener('pointerup', restore, { once: true });
  });

};
