import React from "react"
import { graphql } from "gatsby"
import { Layout, SEO, Posts, Title } from "@/components/"
import * as I from "@/interfaces"
import css from "@emotion/css"

export default ({ data: { postsData, tag } }: Props) => {
  return (
    <Layout>
      <SEO title="Tag" />
      <div css={CSS["title"]}>
        <Title type="h2">タグ: {tag.name}</Title>
      </div>
      <Posts data={postsData.edges} />
    </Layout>
  )
}

const CSS = {
  title: css`
    margin-bottom: 20px;
  `,
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
          updatedAt(formatString: "YYYY-MM-DD", locale: "ja")
          tags {
            name
          }
          slug
          body {
            childMarkdownRemark {
              excerpt(pruneLength: 100, format: PLAIN)
            }
          }
        }
      }
    }
    tag: contentfulTag(slug: { eq: $slug }) {
      name
    }
  }
`

type Props = {
  data: {
    postsData: {
      edges: { node: I.Post }[]
    }
    tag: I.Tag
  }
}
