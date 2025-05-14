import { showCamera, modelsCamera, resetModelCamera } from "./camera";
import { showRenderer, modelsRenderer } from "./renderers";
import { showScene, modelsScene } from "./scenes";
import { showControls, modelsControls } from "./orbitControl"; 
import loadScene from "./loader";

import { switchToModels, switchToAbout, switchToShow } from "./switchScenes";
import { initialize, initiazlieDefault, setModel, nextModel, previousModel, getCurrentModel, toggleWireframe } from "./models";




export { showCamera, modelsCamera, resetModelCamera };
export { showControls, modelsControls }; 
export { showScene, modelsScene };
export { showRenderer, modelsRenderer };
export { loadScene };
export { switchToShow, switchToAbout, switchToModels };
export { initialize, initiazlieDefault, setModel, nextModel, previousModel, getCurrentModel, toggleWireframe };
