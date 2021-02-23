import { Page } from './Page'
import { Language } from './Language'
export interface ArticleItf {
  id: number,
  title: string,
  language: Language,
  pages: Page[]
}
