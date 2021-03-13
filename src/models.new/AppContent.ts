import { Image } from './Image'
import { Article } from './Article'
export interface AppContent {
  id: number
  name: string
  created_at: string
  updated_at: string
  slug: string
  articles: Article[]
  icon: Image
}