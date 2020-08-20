import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Layout, SEO, Posts, Title } from "@/components/"
import "@/styles/sass/index.scss"
import "github-markdown-css"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import { IPost } from "@/interfaces/IPost"
import css from "@emotion/css"

export default () => {
  const data: Props = useStaticQuery(graphql`
    {
      allContentfulBlogPost {
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
    edges: { node: IPost }[]
  }
}
