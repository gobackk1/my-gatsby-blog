import React from "react"
import { graphql } from "gatsby"
import { Layout, SEO, Posts, Title } from "@/components/"
import * as I from "@/interfaces"
import css from "@emotion/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag } from "@fortawesome/free-solid-svg-icons"
import { COLOR } from "@/styles"

export default ({ data: { postsData, tag } }: Props) => {
  return (
    <Layout>
      <SEO title="Tag" />
      <div css={CSS["title"]}>
        <Title type="h2">
          <FontAwesomeIcon icon={faTag} /> {tag.name} の記事一覧
        </Title>
      </div>
      <Posts data={postsData.edges} />
    </Layout>
  )
}

const CSS = {
  title: css`
    margin-bottom: 20px;
    color: ${COLOR.ACCENT};
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
          updatedAt(formatString: "YYYY-MM-DD", locale: "ja")
          tags {
            name
            slug
          }
          slug
          body {
            childMarkdownRemark {
              excerpt(pruneLength: 100, format: PLAIN)
            }
          }
          description {
            description
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
