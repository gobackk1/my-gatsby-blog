import React from "react"
import { IPost } from "@/interfaces"
import { css } from "@emotion/core"
import { navigate } from "@reach/router"
import { Title, Tag } from "@/components"
import { COLOR } from "@/styles"
import { tagList } from "@/styles/common"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faTag } from "@fortawesome/free-solid-svg-icons"

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
          tabIndex={0}
        >
          <Title type="h3">{title}</Title>
          <p>{body.childMarkdownRemark.excerpt}</p>
          <div css={style.postFooter}>
            <div css={style.postFooterTime}>
              <FontAwesomeIcon icon={faClock} />
              <time>{updatedAt}</time>
            </div>
            <div css={style.tags}>
              {tags && (
                <>
                  <FontAwesomeIcon icon={faTag} />
                  <ul css={style.tagList}>
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

const style = {
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
  postList: css`
    margin-bottom: 10px;
  `,
  tagList: css`
    ${tagList}
    margin-left: 10px;
  `,
  tags: css`
    display: flex;
    color: ${COLOR.ACCENT};
  `,
  tag: css`
    color: ${COLOR.ACCENT};
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  `,
  postFooter: css`
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    line-height: 1;
  `,
  postFooterTime: css`
    display: flex;
    time {
      padding-left: 5px;
    }
  `,
}

type Props = {
  data: { node: IPost }[]
}
