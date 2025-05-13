import * as THREE from "three";


export enum Models {
	Room = "Room", 
	Bed = "Bed", 
	Lamp = "Lamp", 
	Desk = "Desk",
	Monitor = "Monitor",
	Chair = "Chair",
}



function collectModels(gltfTree: THREE.Group<THREE.Object3DEventMap>, objMap: Map<Models, THREE.Object3D>) {
  gltfTree.traverse((obj) => {

    if (obj.type !== "Object3D") return;

    const logEntryNotFound = () => console.error("Unmatched model found"); 
    const insertToMap = (key: Models, value: THREE.Object3D) => objMap.set(key, value);

    switch (obj.name)  {

      case Models.Room:
        insertToMap(Models.Room, obj);
      return;

      case Models.Bed:
        insertToMap(Models.Bed, obj);
        return;

      case Models.Desk:
        insertToMap(Models.Desk, obj);
        return;

      case Models.Monitor:
        insertToMap(Models.Monitor, obj);
        return;
      
      case Models.Chair:
        insertToMap(Models.Chair, obj);
        return;

      case Models.Lamp:
        insertToMap(Models.Lamp, obj);
        return;

      default:
        logEntryNotFound();
        return;
    }

  });


}
