import { Icon } from './Icon'
import { Article } from './Article'
export interface Content {
  id: number,
  name: string,
  icon: Icon,
  media: Icon[],
  article: Article[]
}