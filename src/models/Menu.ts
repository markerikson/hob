export interface Menu {
  name: string,
  slug: string,
  access?: string,
  resource: string,
  active_icon: string,
  inactive_icon?: string,
  background_color?: string,
  parent: string,
}