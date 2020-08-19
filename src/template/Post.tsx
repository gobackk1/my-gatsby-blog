import React from "react"
import { Link, graphql } from "gatsby"
import { Layout, SEO } from "../components"
import IPost from "@/interfaces/IPost"

type Props = {
  data: {
    contentfulBlogPost: IPost
  }
}

export default ({ data }: Props) => {
  const post = data.contentfulBlogPost
  return (
    <Layout>
      <SEO title={post.title}></SEO>
      <div className="post">
        <h1>{post.title}</h1>
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
