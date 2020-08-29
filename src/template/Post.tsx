import React from "react"
import { graphql, Link } from "gatsby"
import { Layout, SEO, Title, Content, Pager } from "@/components"
import { IPost, ITag } from "@/interfaces"
import css from "@emotion/css"

export default ({ data, pathContext }: Props) => {
  const { post, json } = data
  const { next, prev } = pathContext
  const relatedPosts = selectRelatedPost(post, json.allPosts)

  return (
    <Layout>
      <SEO title={post.title}></SEO>
      <time css={style.time}>{post.updatedAt}</time>
      <Title type="h1">{post.title}</Title>
      <Content post={post} />
      <Pager prev={prev} next={next} />
      {relatedPosts.length ? (
        <section>
          <Title type="h3">関連記事</Title>
          {relatedPosts.map((post: any, i: number) => {
            return (
              <div key={i}>
                <Link to={`/posts/${post.slug}`}>
                  <time>{post.updatedAt}</time>
                  {post.title}
                </Link>
              </div>
            )
          })}
        </section>
      ) : null}
    </Layout>
  )
}

const style = {
  dateAndTag: css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  `,

  time: css`
    margin-bottom: 10px;
    display: block;
  `,
}

type Props = {
  data: {
    post: IPost
    json: any
  }
  pathContext: {
    slug: string
    id: string
    next: { title: string; slug: string }
    prev: { title: string; slug: string }
  }
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

type TRelated = {
  slug: string
  updateAt: string
  title: string
}

const selectRelatedPost = (post: IPost, allPosts: any): TRelated[] => {
  const result = allPosts.filter((jsonPost: IPost) => {
    // 記事自身は関連記事に表示しない
    if (jsonPost.id === post.id) return false

    let flag = false
    const postIds = jsonPost.tags.map((tag: ITag) => tag.id!)
    post.tags
      .map((tag: ITag) => tag.id!)
      .forEach((id: string) => {
        if (postIds.includes(id)) {
          flag = true
        }
      })
    return flag
  })
  return result
}
