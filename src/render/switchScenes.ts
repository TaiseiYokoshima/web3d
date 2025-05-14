import { showRenderer, modelsRenderer } from "./renderers";
import {  showControls, modelsControls } from "./orbitControl";
import { showScene, modelsScene } from "./scenes";
import { showCamera, modelsCamera } from "./camera";


enum Scene {
  Show,
  Models,
  About,
}

let currentScene = Scene.Show;

function animateShow() {
  // console.log("animating show");
  if (currentScene !== Scene.Show) return;

  requestAnimationFrame(animateShow);
  if (showControls) showControls.update();
  showRenderer.render(showScene, showCamera);
};


function animateModels() {
  // console.log("animating models");
  if (currentScene !== Scene.Models) return;

  requestAnimationFrame(animateModels);
  if (modelsControls) modelsControls.update();
  modelsRenderer.render(modelsScene, modelsCamera);
};


function bringShowUp() {
  showRenderer.domElement.style.zIndex = "1";
}

function bringModelsUp() {
  modelsRenderer.domElement.style.zIndex = "1";
}


function bringShowDown() {
  showRenderer.domElement.style.zIndex = "0";
}

function bringModelsDown() {
  modelsRenderer.domElement.style.zIndex = "0";
}


export function switchToShow() {
  currentScene = Scene.Show;
  animateShow();
  bringShowUp();
  bringModelsDown();
}


export function switchToModels() {
  currentScene = Scene.Models;
  animateModels();
  bringModelsUp();
  bringShowDown();
}


export function switchToAbout() {
  currentScene = Scene.About;
  bringModelsDown();
  bringShowDown();
}


