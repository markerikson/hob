import { Label } from './Label';
import { Icon } from './Icon';
export interface Children {
  id:   number,
  name: string,
  icon: Icon,
  ionic_resource: string,
  label?: Label[]
}