import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Layout, SEO, Posts, Title } from "@/components/"
import "@/styles/sass/index.scss"
import IPost from "@/interfaces/IPost"

type Props = {
  allContentfulBlogPost: {
    edges: { node: IPost }[]
  }
}

const Home: React.FC = () => {
  const data: Props = useStaticQuery(graphql`
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
