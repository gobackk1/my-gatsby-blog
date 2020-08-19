import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Layout, SEO, Posts, Title } from "@/components/"
import "@/styles/sass/index.scss"
import IPost from "@/interfaces/IPost"
import ITag from "@/interfaces/ITag"

type Props = {
  data: {
    postsData: {
      edges: { node: IPost }[]
    }
    tag: ITag
  }
}

export default ({ data: { postsData, tag } }: Props): JSX.Element => {
  return (
    <Layout>
      <SEO title="Tag" />
      <Title type="h2">タグ: {tag.name}</Title>
      <Posts data={postsData.edges} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    postsData: allContentfulBlogPost(
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          title
          description {
            description
          }
          updatedAt(locale: "ja")
          tags {
            name
          }
          slug
        }
      }
    }
    tag: contentfulTag(slug: { eq: $slug }) {
      name
    }
  }
`
