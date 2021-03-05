//import { Submenu } from './Submenu'
export interface Menu {
  name: string,
  resource: string,
  icon_url: string,
  background_color?: string,
  parent: string,
  //menus?: Submenu[],
}