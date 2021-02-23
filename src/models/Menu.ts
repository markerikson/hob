import { Label } from './Label'
import { Icon } from './Icon'
export interface Menu {
  id:   number,
  name: string,
  icon: Icon,
  ionic_resource: string,
  label?: Label[]
}