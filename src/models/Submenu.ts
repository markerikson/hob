import { Icon } from './Icon'
import { Children } from './Children'
export interface Submenu {
  id: number,
  name: string,
  icon: Icon,
  ionic_resource: string,
  description: string,
  children?: {
    [key: string]: Children
  }
}