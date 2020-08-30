import React from "react"
import * as I from "@/interfaces"
import { css } from "@emotion/core"
import { navigate } from "@reach/router"
import { Title, Tag } from "@/components"
import { COLOR } from "@/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faTag } from "@fortawesome/free-solid-svg-icons"

export const Posts: React.FC<Props> = ({ data }) => {
  return (
    <div css={CSS["post-list"]}>
      {data.map(({ node: { tags, title, updatedAt, slug, body } }, index) => (
        <article
          css={CSS["post"]}
          key={index}
          onClick={() => {
            navigate(`/posts/${slug}`)
          }}
          tabIndex={0}
        >
          <Title type="h3">{title}</Title>
          <p>{body.childMarkdownRemark.excerpt}</p>
          <div css={CSS["post-footer"]}>
            <div css={CSS["post-footer-item"]}>
              <FontAwesomeIcon icon={faClock} />
              <time>{updatedAt}</time>
            </div>
            <div css={CSS["tags"]}>
              {tags && (
                <>
                  <FontAwesomeIcon icon={faTag} />
                  <ul css={CSS["tag-list"]}>
                    {tags.map(({ name, slug }, index) => (
                      <li key={index}>
                        <Tag name={name} slug={slug} />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

const CSS = {
  post: css`
    position: relative;
    margin-bottom: 20px;
    padding: 30px 20px 20px;
    border: 1px solid ${COLOR.WHITE};
    &:hover {
      opacity: 0.6;
      cursor: pointer;
    }
    h2 {
      margin-bottom: 10px;
    }
    time {
      /* padding: 3px 5px;
      position: absolute;
      top: 0;
      right: 0;
      background: ${COLOR.WHITE};
      color: ${COLOR.BLACK};
      font-size: 12px; */
    }
    p {
      margin-bottom: 2em;
    }
    ul {
      justify-content: flex-end;
    }
  `,
  "post-list": css`
    margin-bottom: 10px;
  `,
  "tag-list": css`
    display: flex;
    > li {
      margin: 0 10px 10px 0;
      a {
        display: block;
      }
    }
    margin-left: 10px;
  `,
  tags: css`
    display: flex;
    color: ${COLOR.ACCENT};
  `,
  "post-footer": css`
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    line-height: 1;
  `,
  "post-footer-item": css`
    display: flex;
    time {
      padding-left: 5px;
    }
  `,
}

type Props = {
  data: { node: I.Post }[]
}
