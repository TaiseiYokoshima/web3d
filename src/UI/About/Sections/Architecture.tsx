import { Section } from "./Section"

export default function Architecture() {
  return (
    <Section title="Architecture">
      <>

        <p> 
          The Three JS state management is completely decoupled from react. 
          The general show page and models page are two separate scenes 
          with their own individual canvases. 
          The implementation of scene management are done by a few data 
          structures, and a collection of functions that mutate the state.
          Such as a function to switchScene from the show scene to the 
          models scene, this changes the z-index property of the canvases to 
          bring models scene's canvas to the foreground. The implmentation merely 
          exposes APIs to react which react to create an interface that mutates
          the scenes.
        </p>

        <p>React Components:</p>
        <ul>
          <li>Loader (Loading screen for while glb assets are downloaded)</li>
          <li>Menu</li>
          <li>Menu Opener Button (Hamburger Button)</li>
          <li>About Page</li>
          <li>Models Page Interface</li>
        </ul>
    
    </>
  </Section>
  );
}
