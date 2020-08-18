import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Layout, SEO, Posts, Title } from "@/components/"
import "@/styles/sass/index.scss"

const Home: React.FC = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulBlogPost {
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
    }
  `)

  const posts = data.allContentfulBlogPost.edges

  return (
    <Layout>
      <SEO title="Home" />
      <Title type="h2">記事一覧</Title>
      <Posts data={posts} />
    </Layout>
  )
}

export default Home
