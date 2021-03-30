//import { Submenu } from './Submenu'
export interface Menu {
  name: string,
  slug: string,
  resource: string,
  active_icon: string,
  inactive_icon?: string,
  background_color?: string,
  parent: string,
  //menus?: Submenu[],
}