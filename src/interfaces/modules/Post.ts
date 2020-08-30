import * as I from "@/interfaces"

export interface Post {
  id: string
  description: {
    description: string
  }
  slug: string
  tags: I.Tag[]
  title: string
  updatedAt: string
  body: {
    childMarkdownRemark: {
      html: string
      excerpt: string
    }
  }
}
