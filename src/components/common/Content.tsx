import React from "react"
import css from "@emotion/css"
import { markdown } from "@/styles"
import * as I from "@/interfaces"
import { Tag } from "@/components"

export const Content: React.FC<Props> = ({ post }) => {
  const { body } = post
  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
        className="markdown-body"
        css={CSS["markdown"]}
      ></div>
      {post.tags && (
        <ul css={CSS["tag-list"]}>
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

const CSS = {
  "tag-list": css`
    display: flex;
    > li {
      margin: 0 10px 10px 0;
      a {
        display: block;
      }
    }
    justify-content: flex-end;
  `,
  // NOTE: markdown のスタイルは github-markdown-css をオーバーライドして運用する
  markdown: css`
    ${markdown}
  `,
}

interface Props {
  post: I.Post
}
