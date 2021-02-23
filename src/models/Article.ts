import { Language } from './Language'
import { Page } from './Page'
export interface Article {
  id: number,
  title: string,
  language: Language,
  pages: Page[]
}
