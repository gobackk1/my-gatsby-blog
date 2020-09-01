import React from "react"
import * as I from "@/interfaces"
import { css } from "@emotion/core"
import { navigate } from "@reach/router"
import { Title, Tag } from "@/components"
import { COLOR } from "@/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faTag } from "@fortawesome/free-solid-svg-icons"
import { MEDIA } from "@/styles"

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
          <div css={CSS["post-title"]}>
            <Title type="h3">{title}</Title>
          </div>
          <div css={CSS["post-excerpt"]}>
            <p>{body.childMarkdownRemark.excerpt}</p>
          </div>
          <div css={CSS["post-footer"]}>
            <div css={CSS["post-footer-item"]}>
              <FontAwesomeIcon icon={faClock} />
              <time>{updatedAt}</time>
            </div>
            <div css={CSS["post-footer-tags"]}>
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
    margin-bottom: 35px;
    padding: 15px;
    border: 2px solid ${COLOR.WHITE};
    &:hover {
      border-color: ${COLOR.SKY_BLUE};
      cursor: pointer;
    }
    p {
      margin-bottom: 2em;
    }
    ${MEDIA.PC} {
      padding: 30px 20px 20px;
    }
  `,
  "post-title": css`
    margin-bottom: 20px;
  `,
  "post-excerpt": css`
    margin-bottom: 20px;
  `,
  "post-list": css`
    margin-bottom: 10px;
  `,
  "tag-list": css`
    display: flex;
    justify-content: flex-end;
    > li {
      margin: 0 10px 10px 0;
      a {
        display: block;
      }
    }
    margin-left: 10px;
  `,
  "post-footer": css`
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    line-height: 1;
  `,
  "post-footer-tags": css`
    display: flex;
    color: ${COLOR.ACCENT};
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
