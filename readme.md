## Initial Issue with css 3d object
Objects in front of the iframe apear to be behind due to the fact that css 3d renderer dom element is layered on top of web gl renderer canvas. Flipping the layering order completely hides the web gl content. so not feasible.


## Occlusion
To fix the above, I had to occlude the iframe. Create a plane mesh that is the same (position, dimensions, rotation) and make it completely transparent and no blending. This ineffect cut a whole in the web gl canvas when this plane mesh is visible. So the css renderer content undearth can be shown therefore the iframe will be visible.

## Input Events Pass Down to Iframe Issue
The occlusion issue raises a new issue where the input events do not get passed down to the iframe since the web gl canvas obstructs the iframe. though it is visible. 


## Fix 1
Have a raycaster and add event listener so that when clicked within the plane mesh it manually adjusts the css properties so that web gl canvas pointer events get disabled allowing it to pass through.


## Issue with fix 1
The current fix only passes down pointerdown and does not pass down pointerup so it is clicked and held constantly. So there must be state management btw down and up events


## Fix 2
Define clear states when the user is allowed to interact with the iframe, disable orbit control, and flip the zindex so that css canvas comes on top of webgl and therefore makes it interactive. 
