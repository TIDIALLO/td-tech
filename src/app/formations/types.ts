export type CourseType = {
  id: string
  title: string
  slug: string
  description: string
  category: string
  level: string
  duration?: string | null
  price?: string
  modules: Array<{ id: string; title: string }>
  videos: unknown[]
  files: unknown[]
}

