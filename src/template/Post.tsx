import React from "react"
import { graphql, Link } from "gatsby"
import { Layout, SEO, Title, Content, Pager } from "@/components"
import * as I from "@/interfaces"
import css from "@emotion/css"

export default ({ data, pathContext }: Props) => {
  const { post, json } = data
  const { next, prev } = pathContext
  const relatedPosts = selectRelatedPost(post, json.allPosts)

  return (
    <Layout>
      <SEO title={post.title}></SEO>
      <time css={CSS["time"]}>{post.updatedAt}</time>
      <Title type="h1">{post.title}</Title>
      <Content post={post} />
      {relatedPosts.length ? (
        <section css={CSS["related"]}>
          <Title type="h4">関連記事</Title>
          {relatedPosts.map((post: any, i: number) => {
            return (
              <div key={i}>
                <Link to={`/posts/${post.slug}`}>
                  <time>{post.updatedAt}</time> / {post.title}
                </Link>
              </div>
            )
          })}
        </section>
      ) : null}
      <div css={CSS["line"]}></div>
      <Pager prev={prev} next={next} />
    </Layout>
  )
}

const CSS = {
  time: css`
    margin-bottom: 10px;
    display: block;
  `,
  related: css`
    margin-bottom: 30px;
    h3 {
      margin-bottom: 0;
    }
  `,
  line: css`
    width: 100%;
    height: 1px;
    background: #fff;
    margin: 30px 0;
  `,
}

type Props = {
  data: {
    post: I.Post
    json: any
  }
  pathContext: {
    slug: string
    id: string
    next: { title: string; slug: string }
    prev: { title: string; slug: string }
  }
}

type TRelated = {
  slug: string
  updateAt: string
  title: string
}

export const pageQuery = graphql`
  query($slug: String!) {
    post: contentfulBlogPost(slug: { eq: $slug }) {
      id
      title
      slug
      updatedAt(formatString: "YYYY-MM-DD", locale: "ja")
      tags {
        name
        slug
        id
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    json: dataJson {
      allPosts {
        id
        updatedAt
        title
        slug
        tags {
          id
          name
          slug
        }
      }
    }
  }
`

const selectRelatedPost = (post: I.Post, allPosts: any): TRelated[] => {
  const result = allPosts.filter((jsonPost: I.Post) => {
    // 記事自身は関連記事に表示しない
    if (jsonPost.id === post.id) return false

    let flag = false
    const postIds = jsonPost.tags.map((tag: I.Tag) => tag.id!)
    post.tags
      .map((tag: I.Tag) => tag.id!)
      .forEach((id: string) => {
        if (postIds.includes(id)) {
          flag = true
        }
      })
    return flag
  })
  return result
}
