import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Layout, SEO, Posts, Title } from "@/components/"
import "@/styles/sass/index.scss"

export default ({ data: { postsData, tag } }) => {
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
