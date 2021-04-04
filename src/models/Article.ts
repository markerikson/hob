import { Slide } from './Slide'
import { Language } from './Language'
export interface ArticleItf {
  id: number,
  title: string,
  language: Language,
  slides: Slide[]
}
