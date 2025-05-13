import * as THREE from "three";


import { modelsScene as scene } from "./scenes";


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

export function initialize(model: Model) {
  const objToInit = objMap.get(model);

  if (objToInit == null) {
    console.error("obj to initialize not in map");
    return
  }

  scene.add(objToInit);
  currentModel = model;
}

export function setModel(model: Model) {
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



export function collectModels(gltfTree: THREE.Group<THREE.Object3DEventMap>) {
  const modelsList: string[] = Object.values(Model);
  gltfTree.traverse((obj) => {
 

    if (obj.type !== "Object3D") return;
    if (!modelsList.includes(obj.name)) {
      console.error("Unmatched model found: ", obj.name); 
      return;
    };

    objMap.set(obj.name as Model, obj);
  });

  if (objMap.size !== modelsList.length)
      console.error("size of map and the Model enum did not match"); 
}
