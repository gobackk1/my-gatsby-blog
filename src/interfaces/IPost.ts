export default interface IPost {
  description: {
    description: string
  }
  slug: string
  tags: string[]
  title: string
  updatedAt: string
  body: {
    childMarkdownRemark: {
      html: string
    }
  }
}
