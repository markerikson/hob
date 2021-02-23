import { Icon } from './Icon'
import { ArticleItf } from './Article'
export interface Content {
  id: number,
  name: string,
  icon: Icon,
  media: Icon[],
  article: ArticleItf[]
}