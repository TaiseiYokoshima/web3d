import * as THREE from "three";


import { modelsScene as scene } from "./scenes";
import { resetModelCamera } from "./camera";


export enum Model {
	Room = "Room", 
	Bed = "Bed", 
	Lamp = "Lamp", 
	Desk = "Desk",
	Monitor = "Monitor",
	Chair = "Chair",
}


const objMap = new Map<Model, THREE.Object3D>();
let currentModel = Model.Room;
let wireframeOn = false;

export function initialize(model: Model) {
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  const objToInit = objMap.get(model);

  if (objToInit == null) {
    console.error("obj to initialize not in map");
    return
  }

  scene.add(objToInit);
  currentModel = model;
}


export function initiazlieDefault () {
  initialize(Model.Room);
}

export function setModel(model: Model) {
  turnOffWireframe();

  const objToAdd = objMap.get(model);
  const objToRemove = objMap.get(currentModel);

  if (objToAdd == null) {
    console.error("obj to add not in map");
    return
  }

  if (objToRemove == null) {
    console.error("obj to remove not in map");
    return
  }

  scene.remove(objToRemove);
  scene.add(objToAdd);
  currentModel = model;
  resetModelCamera();
}


export function nextModel() {
  const modelsList: Model[] = Object.values(Model);
  const currentI = modelsList.indexOf(currentModel);

  if (currentI < 0) {
    console.error("currentI not found in nextModel");
    return;
  }

  const nextI = (currentI === modelsList.length - 1) ? 0 : currentI + 1;
  setModel(modelsList[nextI]);
}

export function previousModel() {
  const modelsList: Model[] = Object.values(Model);
  const currentI = modelsList.indexOf(currentModel);

  if (currentI < 0) {
    console.error("currentI not found in previousModel");
    return;
  }

  const prevoiusI = (currentI === 0) ? modelsList.length - 1 : 0;
  setModel(modelsList[prevoiusI]);
}


export function getCurrentModel() {
  return currentModel;
}


function applyWireframe(model: THREE.Object3D<THREE.Object3DEventMap>) {
  model.traverse((object) => {

    if (!(object instanceof THREE.Mesh)) return;

    if (!Array.isArray(object.material)) {
      object.material.wireframe = wireframeOn;
      return;
    }

    object.material.forEach(material => {
      material = wireframeOn;
    });

  });
}



function turnOffWireframe() {
  const obj = objMap.get(currentModel);

  if (!obj) {
    console.error("current obj not found in turnOffWireframe");
    return;
  }

  wireframeOn = false;
  applyWireframe(obj);
}


function turnOnWireframe() {
  const obj = objMap.get(currentModel);

  if (!obj) {
    console.error("current obj not found in turnOnWireframe");
    return;
  }

  wireframeOn = true;
  applyWireframe(obj);
}

export function toggleWireframe() {
  if (wireframeOn) turnOffWireframe();
  else turnOnWireframe();
}




export function collectModels(gltfTree: THREE.Group<THREE.Object3DEventMap>) {
  const modelsList: string[] = Object.values(Model);
  gltfTree.traverse((obj) => {

    console.log(obj.type, ": ", obj.name);
 
    if (obj instanceof THREE.PointLight) 
      obj.intensity = 3;

    if (obj.type !== "Object3D") return;
    if (!modelsList.includes(obj.name)) {
      console.error("Unmatched model found: ", obj.name); 
      return;
    };

    const cloned = obj.clone()
    cloned.position.set(0, 0, 0);
    objMap.set(obj.name as Model, cloned);
  });

  if (objMap.size !== modelsList.length)
      console.error("size of map and the Model enum did not match"); 
}
