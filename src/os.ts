import * as THREE from 'three';
import { CSS3DObject } from "three/examples/jsm/Addons.js";

const test_div = document.createElement("div");
test_div.innerText = 'Hello World';
test_div.style.background = 'black';
test_div.style.color = 'red';



const rawScreenWidth = window.screen.width * window.devicePixelRatio;
const rawScreenHeight = window.screen.height * window.devicePixelRatio;

// console.log(`Raw resolution: ${rawScreenWidth} x ${rawScreenHeight}`);


export const PIXEL_WIDTH = 1920;
export const PIXEL_HEIGHT = 1080;

export const iframe = document.createElement("iframe");
iframe.src = "https://os.henryheffernan.com/"
iframe.style.width = "100%";
iframe.style.height = "100%";
iframe.style.border = 'none';
iframe.style.backfaceVisibility = 'hidden';

export const iframe_div = document.createElement("div");
iframe_div.style.overflow = "hidden";
iframe_div.style.backgroundColor = '#000';
iframe_div.style.width = `${PIXEL_WIDTH}px`;
iframe_div.style.height = `${PIXEL_HEIGHT}px`;
iframe_div.appendChild(iframe);
iframe_div.style.backfaceVisibility = 'hidden';

iframe_div.addEventListener('pointerdown', () => {console.log("iframe div clicked")});
iframe.addEventListener('pointerdown', () => {console.log("iframe clicked")});

export const os = new CSS3DObject(iframe_div);



