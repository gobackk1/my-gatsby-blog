import React from "react"
import css from "@emotion/css"
import { markdown, COLOR } from "@/styles"
import * as I from "@/interfaces"
import { Tag } from "@/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag } from "@fortawesome/free-solid-svg-icons"

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
          <li>
            <FontAwesomeIcon icon={faTag} />
          </li>
          {post.tags.map(({ name, slug }, index) => (
            <li key={index}>
              <Tag name={name} slug={slug} />
            </li>
          ))}
        </ul>
      )}
      <div css={CSS["line"]}></div>
    </>
  )
}

const CSS = {
  "tag-list": css`
    display: flex;
    color: ${COLOR.ACCENT};
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
    margin-bottom: 40px;
  `,
  line: css`
    width: 100%;
    height: 1px;
    background: #fff;
    margin: 30px 0;
  `,
}

interface Props {
  post: I.Post
}
