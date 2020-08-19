import { ITag } from "@/interfaces"

export interface IPost {
  description: {
    description: string
  }
  slug: string
  tags: ITag[]
  title: string
  updatedAt: string
  body: {
    childMarkdownRemark: {
      html: string
    }
  }
}
