import {  createContext, RefObject, useRef } from "react"


interface MenuContextInterface {
  menuIsOpen: boolean,
  opener: RefObject<HTMLDivElement | null>,
  menu: RefObject<HTMLDivElement | null>,
  openMenu: () => void,
  closeMenu: () => void,
}



const MenuContext = createContext<MenuContextInterface | null>(null);
export default MenuContext;

