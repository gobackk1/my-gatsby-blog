import React from "react"
import { graphql } from "gatsby"
import { Layout, SEO, Title, Tag } from "@/components"
import { IPost } from "@/interfaces"
import css from "@emotion/css"
import { COLOR } from "@/styles"
import { tagList } from "@/styles/common"

export default ({ data }: Props) => {
  const post = data.contentfulBlogPost
  return (
    <Layout>
      <SEO title={post.title}></SEO>
      <time>{post.updatedAt}</time>
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
}

type Props = {
  data: {
    contentfulBlogPost: IPost
  }
}

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      updatedAt(formatString: "YYYY MM/DD", locale: "ja")
      tags {
        name
        slug
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
