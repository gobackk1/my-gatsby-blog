import React from "react"
import css from "@emotion/css"
import { COLOR } from "@/styles"
import { IPost } from "@/interfaces/IPost"
import { Tag } from "@/components"
import { tagList } from "@/styles/common"

export const Content: React.FC<Props> = ({ post }) => {
  const { body } = post
  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
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
    </>
  )
}

const style = {
  tagList: css`
    ${tagList};
    justify-content: flex-end;
  `,
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
}

interface Props {
  post: IPost
}
