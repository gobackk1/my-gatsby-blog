import React from "react"
import { graphql, Link } from "gatsby"
import { Layout, SEO, Title, Tag } from "@/components"
import { IPost, ITag } from "@/interfaces"
import css from "@emotion/css"
import { COLOR } from "@/styles"
import { tagList } from "@/styles/common"

export default ({ data, pathContext }: Props) => {
  const { post, json } = data
  const { next, prev } = pathContext

  const relatedPosts = selectRelatedPost(post, json.allPosts)

  return (
    <Layout>
      <SEO title={post.title}></SEO>
      <time css={style.time}>{post.updatedAt}</time>
      <Title type="h1">{post.title}</Title>
      <div
        dangerouslySetInnerHTML={{
          __html: post.body.childMarkdownRemark.html,
        }}
        className="markdown-body"
        css={style.markdown}
      ></div>
      {post.tags && (
        <ul css={style.tagList}>
          <li>タグ:</li>
          {post.tags.map(({ name, slug }, index) => (
            <li key={index}>
              <Tag name={name} slug={slug} />
            </li>
          ))}
        </ul>
      )}
      <div css={style.pager}>
        <div>
          {next && (
            <Link to={`/posts/${next.slug}`} css={style.next}>
              {next.title}
            </Link>
          )}
        </div>
        <div>
          {prev && (
            <Link to={`/posts/${prev.slug}`} css={style.prev}>
              {prev.title}
            </Link>
          )}
        </div>
      </div>
      {relatedPosts.length ? (
        <section>
          <h3>関連記事</h3>
          {relatedPosts.map((post: any, i: number) => {
            return (
              <div key={i}>
                <div>{post.title}</div>
              </div>
            )
          })}
        </section>
      ) : null}
    </Layout>
  )
}

const style = {
  // NOTE: markdown のスタイルは github-markdown-css をオーバーライドして運用する
  markdown: css`
    font-family: monaco, monospace;

    *:not(code) {
      color: ${COLOR.SITE.TEXT};
    }

    table td,
    table th {
      color: ${COLOR.SITE.TEXT_REVERSAL};
    }

    .gatsby-highlight-code-line {
      background-color: ${COLOR.CODE_BLOCK.HIGHLIGHT};
      display: block;
      margin-right: -1em;
      margin-left: -1em;
      padding-right: 1em;
      padding-left: 0.75em;
      border-left: 0.25em solid ${COLOR.CODE_BLOCK.HIGHLIGHT};
    }

    .gatsby-highlight {
      background-color: #2d2d2d;
      border-radius: 0.3em;
      margin: 0.5em 0;
      padding: 1em;
      overflow: auto;
    }

    .gatsby-highlight pre[class*="language-"] {
      background-color: transparent;
      margin: 0;
      padding: 0;
      overflow: initial;
      float: left;
      min-width: 100%;
    }

    .gatsby-highlight pre[class*="language-"].line-numbers {
      padding-left: 2.8em;
    }
  `,
  dateAndTag: css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  `,
  tagList: css`
    ${tagList};
    justify-content: flex-end;
  `,
  time: css`
    margin-bottom: 10px;
    display: block;
  `,
  pager: css`
    display: flex;
    justify-content: space-between;
  `,
  next: css`
    &::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      border-right: 1px solid;
      border-bottom: 1px solid;
      transform: rotate(135deg);
    }
  `,
  prev: css`
    &::after {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      border-right: 1px solid;
      border-bottom: 1px solid;
      transform: rotate(-45deg);
    }
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
