import * as I from "@/interfaces"

export interface Tag {
  name: string
  slug: string
  id?: string
  count?: number
  blog_post?: I.Post[]
}
