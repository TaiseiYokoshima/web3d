import MenuPanel from "./Panel";
import Opener from "./Opener";
import { useEffect, useRef } from "react";

import openerStyles from "./Opener.module.css";
import closerStyles from "./Panel.module.css";

import { menuTransitionDuration } from '../imports';
import  MenuContext  from "./context";

function generateMenuCallbacks(menuIsOpen: boolean) 
{
  const opener = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    if (!opener.current) {
      console.log("open: opener null")
      return;
    }
    if (!menu.current) {
      console.log("open: closer null")
      return;
    }

    menu.current.classList.add(closerStyles.open);
    opener.current.classList.add(openerStyles.open);
    console.log("menu opened");
    menuIsOpen = true;
  }


  const closeMenu = () => {
    if (!opener.current) {
      console.log("close: opener null")
      return;
    }
    if (!menu.current) {
      console.log("close: closer null")
      return;
    }

    menu.current.classList.remove(closerStyles.open);
    opener.current.classList.remove(openerStyles.open);
    console.log("menu closed");
    menuIsOpen = false;
  }


  return { menuIsOpen, opener, menu, openMenu, closeMenu };
}

export default function Menu() {
  const duration = menuTransitionDuration;
  const contexValue = generateMenuCallbacks(true);

  useEffect(() => {
    if (contexValue.menuIsOpen) contexValue.openMenu();
    else contexValue.closeMenu();
  });

  return (
    <>
      <MenuContext.Provider value={contexValue}>
        <Opener transitionDuration={duration} />
        <MenuPanel transitionDuration={duration} />
      </MenuContext.Provider>
    </>
  );

}
