export interface Submenu {
  name: string
  resource: string
  active_icon: string
  inactive_icon?: string
  parent_icon: string
  background_color?: string
  slug:string
  access?:string
  has_main: boolean
}