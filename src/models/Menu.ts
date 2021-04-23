export interface Menu {
  name: string
  slug : string
  access?: string
  resource: string
  section: string
  active_icon: string
  inactive_icon: string
  background_color?: string
  parent: string
  has_main?: boolean
}