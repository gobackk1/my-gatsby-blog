import React from "react"
import { IPost } from "@/interfaces"
import { css } from "@emotion/core"
import { navigate } from "@reach/router"
import { Title, Tag } from "@/components"
import { COLOR } from "@/styles"
import { tagList } from "@/styles/common"

export const Posts: React.FC<Props> = ({ data }) => {
  return (
    <div css={style.postList}>
      {data.map(({ node: { tags, title, updatedAt, slug, body } }, index) => (
        <article
          css={style.post}
          key={index}
          onClick={() => {
            navigate(`/posts/${slug}`)
          }}
        >
          <Title type="h3">{title}</Title>
          <p>{body.childMarkdownRemark.excerpt}</p>
          {tags && (
            <ul css={tagList}>
              {tags.map(({ name, slug }, index) => (
                <li key={index}>
                  <Tag name={name} slug={slug} />
                </li>
              ))}
            </ul>
          )}
          <time>{updatedAt}</time>
        </article>
      ))}
    </div>
  )
}

const style = {
  post: css`
    position: relative;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid ${COLOR.WHITE};
    &:hover {
      opacity: 0.6;
      cursor: pointer;
    }
    h2 {
      margin-bottom: 10px;
    }
    time {
      padding: 5px;
      position: absolute;
      top: 0;
      right: 0;
      background: ${COLOR.WHITE};
      color: ${COLOR.BLACK};
    }
    p {
      margin-bottom: 20px;
    }
    ul {
      justify-content: flex-end;
    }
  `,
  postList: css`
    margin-bottom: 10px;
  `,
  tag: css`
    color: ${COLOR.ACCENT};
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  `,
}

type Props = {
  data: { node: IPost }[]
}
