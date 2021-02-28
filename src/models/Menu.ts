import { SubMenu } from './SubMenu'
export interface Menu {
  name: string,
  resource: string,
  icon_url: string,
  background_color: string,
  main?: boolean,
  menus?:SubMenu[],
}