import { animate } from './render/switchScenes';
import { initUI } from './UI/UI';
import { showRenderer, showCamera, modelsRenderer, modelsCamera } from 'Render';


window.addEventListener('resize', () => {
  showCamera.aspect = window.innerWidth / window.innerHeight;
  showCamera.updateProjectionMatrix();

  modelsCamera.aspect = window.innerWidth / window.innerHeight;
  modelsCamera.updateProjectionMatrix();

  showRenderer.setSize(window.innerWidth, window.innerHeight, true);
  modelsRenderer.setSize(window.innerWidth, window.innerHeight, true);
}, true);


initUI();
animate();

