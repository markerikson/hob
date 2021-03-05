import { Icon } from './Icon'
import { Label } from './Label'
export interface Children {
  id: number,
  name: string,
  icon: Icon,
  ionic_resource: string,
  label?: Label[]
}