import { IPost } from "@/interfaces"

export interface ITag {
  name: string
  slug: string
  id?: string
  count?: number
  blog_post?: IPost[]
}
