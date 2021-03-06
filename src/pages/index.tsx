import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Layout, SEO, Posts, Title } from "@/components/"
import * as I from "@/interfaces/"
import css from "@emotion/css"

export default () => {
  const data: Props = useStaticQuery(graphql`
    {
      allContentfulBlogPost(sort: { fields: updatedAt, order: DESC }) {
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
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <div css={style.title}>
        <Title type="h2">記事一覧</Title>
      </div>
      <Posts data={data.allContentfulBlogPost.edges} />
    </Layout>
  )
}

const style = {
  title: css`
    margin-bottom: 20px;
  `,
}

type Props = {
  allContentfulBlogPost: {
    edges: { node: I.Post }[]
  }
}
