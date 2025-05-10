import { initUI } from './UI/UI';
import { glScene, cssScene, glControls, glRenderer, cssRenderer, cssControls, camera, modelsRenderer } from 'Render';


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  glRenderer.setSize(window.innerWidth, window.innerHeight, true);
  modelsRenderer.setSize(window.innerWidth, window.innerHeight, true);
}, true);

export function animate() {
  requestAnimationFrame(animate);
  

  if (cssControls) cssControls.update();
  if (glControls) glControls.update();

  glRenderer.render(glScene, camera);
  cssRenderer.render(cssScene, camera);
};



animate();
initUI(glScene);

