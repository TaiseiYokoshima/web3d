import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from 'three';
import { os, PIXEL_WIDTH, PIXEL_HEIGHT } from './os';


function generateOccluderMesh(screenWorldWidth: number, screenWorldHeight: number) : THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(screenWorldWidth, screenWorldHeight);

  const material = new THREE.MeshLambertMaterial();
  material.blending = THREE.NoBlending;
  material.side = THREE.DoubleSide;
  material.opacity = 0;
  material.color.set('black');
  material.transparent = true;

  const occluderMesh = new THREE.Mesh(geometry, material);

  return occluderMesh;
}


function getOSDimensions(reference: THREE.Mesh): [number, number] {
  const size = new THREE.Vector3();
  new THREE.Box3().setFromObject(reference).getSize(size);

  const osX = size.x;
  const osY = size.y;
  return [osX, osY];
}

function setIframe(reference: THREE.Mesh, scene: THREE.Scene) {
  const [ osX, osY ] = getOSDimensions(reference);

  // position, quaternion, rotate
  os.position.copy(reference.getWorldPosition(new THREE.Vector3()));
  os.quaternion.copy(reference.getWorldQuaternion( new THREE.Quaternion()));

  let cssScaleX = (osX / PIXEL_WIDTH) * 0.8;
  let cssScaleY = (osY / PIXEL_HEIGHT) * 0.8;

  os.scale.set(cssScaleX , cssScaleY, 1);

  os.rotateX(Math.PI / 2);
  os.rotateZ(Math.PI);

  os.position.z += 0.001;



  const occluderMesh = generateOccluderMesh(osX, osY); 
  occluderMesh.position.copy(os.position);
  occluderMesh.quaternion.copy(os.quaternion);


   
  scene.add(os);
  scene.add(occluderMesh);

}


export function findReference(scene: THREE.Scene) {
  scene.traverse((obj) => {

    if(obj.name === "Iframe_Reference" && obj instanceof THREE.Mesh) {
      obj.material = obj.material.clone();
      obj.material.color.set(0xff0000);
      obj.material.needsUpate = true;
      setIframe(obj, scene);
      return;
    }

  });
}


export function loadMonitor(scene: THREE.Scene) {
  const loader = new GLTFLoader();

  loader.load( 'monitor.glb',
    (gltf) => { 
      const monitor = gltf.scene;
      scene.add(monitor)
      findReference(scene);
    },

    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },


    (error) => {
      console.error('An error happened', error);
    }
  );
}




