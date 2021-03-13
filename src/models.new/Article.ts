import { Language } from './Language'
import { ArtPage } from './ArtPage'
export interface Article {
  id: number
  language: Language
  title: string
  extra_content: string
  pages: ArtPage[]
}