import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Layout, SEO } from "@/components/"
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
          }
        }
      }
    }
  `)

  const posts = data.allContentfulBlogPost.edges

  console.log(data.allContentfulBlogPost.edges)

  return (
    <Layout>
      <SEO title="Home" />
      {posts.map(({ node: { description, tags, title, updatedAt } }) => (
        <div>
          <div>{title}</div>
          <div>{description.description}</div>
          <div>
            {tags &&
              tags.map((tag, index) => <span key={index}>{tag.name}</span>)}
          </div>
          <div>{updatedAt}</div>
        </div>
      ))}
    </Layout>
  )
}

export default Home
