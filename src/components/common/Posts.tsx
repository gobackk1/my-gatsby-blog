import React from "react"
import { Link } from "gatsby"
import IPost from "@/interfaces/IPost"
import { css } from "@emotion/core"
import { navigate } from "@reach/router"
import { Title } from "@/components"
import { COLOR } from "../../styles"

type Props = {
  data: { node: IPost }[]
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
      display: flex;
      justify-content: flex-end;
    }
    li {
      margin-right: 10px;
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

export const Posts: React.FC<Props> = ({ data }) => {
  return (
    <div css={style.postList}>
      {data.map(
        ({ node: { description, tags, title, updatedAt, slug } }, index) => (
          <article
            css={style.post}
            key={index}
            onClick={() => {
              navigate(`/posts/${slug}`)
            }}
          >
            <Title type="h3">{title}</Title>
            <p>{description.description}</p>
            <ul>
              {tags &&
                tags.map((tag, index) => (
                  <li css={style.tag} key={index}>
                    <Link to="/work">{tag.name}</Link>
                  </li>
                ))}
            </ul>
            <time>{new Date(updatedAt).toLocaleDateString()}</time>
          </article>
        )
      )}
    </div>
  )
}
