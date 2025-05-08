import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from 'three';
import { os, PIXEL_WIDTH, PIXEL_HEIGHT } from './os';


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

function findReference(scene: THREE.Scene) {
  scene.traverse((obj) => {

    if(obj.name === "Iframe_Reference" && obj instanceof THREE.Mesh) {
      obj.material = obj.material.clone();
      obj.material.color.set(0xff0000);
      obj.material.needsUpate = true;
      setIframe(scene, obj);
      return;
    }

  });
}


function computeDim(mesh: THREE.Mesh) {
  const geom = mesh.geometry as THREE.BufferGeometry;
  geom.computeBoundingBox();

  const box = new THREE.Box3().setFromObject( mesh );

  const size = box.getSize( new THREE.Vector3() );
  const worldWidth  = size.x;
  const worldHeight = size.y;
  return [worldWidth, worldHeight];
}

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

function setIframe(scene: THREE.Scene, planeMesh: THREE.Mesh) {

  os.element.style.width  = '1px';
  os.element.style.height = '1px';


  // 3) Scale to the plane’s size in world units
  const [ pw, ph ] = computeDim(planeMesh);
  os.scale.set( pw * planeMesh.scale.x, ph * planeMesh.scale.y, 1 ); // :contentReference[oaicite:1]{index=1}

  // 4) Match position & rotation
  os.position.copy( planeMesh.position );
  os.rotation.copy( planeMesh.rotation );

  // 5) Add to CSS scene (rendered with CSS3DRenderer)
  scene.add( os );

  const occluder = generateOccluderMesh(pw, ph);
  scene.add(occluder);

}


