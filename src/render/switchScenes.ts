import { showRenderer, modelsRenderer } from "./renderers";
import {  showControls, modelsControls } from "./orbitControl";
import { showScene, modelsScene } from "./scenes";
import { showCamera } from "./camera";


export function animate() {
  requestAnimationFrame(animate);
  
  if (showControls) showControls.update();
  showRenderer.render(showScene, showCamera);
};



