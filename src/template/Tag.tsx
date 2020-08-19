import React from "react"
import { graphql } from "gatsby"
import { Layout, SEO, Posts, Title } from "@/components/"
import "@/styles/sass/index.scss"
import { IPost, ITag } from "@/interfaces"
import css from "@emotion/css"

export default ({ data: { postsData, tag } }: Props) => {
  return (
    <Layout>
      <SEO title="Tag" />
      <div css={style.title}>
        <Title type="h2">タグ: {tag.name}</Title>
      </div>
      <Posts data={postsData.edges} />
    </Layout>
  )
}

const style = {
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

type Props = {
  data: {
    postsData: {
      edges: { node: IPost }[]
    }
    tag: ITag
  }
}
