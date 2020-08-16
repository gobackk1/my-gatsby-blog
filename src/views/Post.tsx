import React from "react"
import { Link, graphql } from "gatsby"
import { Layout, SEO } from "../components"

export default ({ data }) => {
  const post = data.contentfulBlogPost
  return (
    <Layout>
      <SEO title={post.title}></SEO>
      <div className="post">
        <h1>{post.title}</h1>
        {/* <div className="tags">
          {tags.map(tag => (
            <span className="tag">{tag}</span>
          ))}
        </div> */}
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
        ></div>
        <Link to="/">back to home</Link>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
