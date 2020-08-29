import React from "react"
import css from "@emotion/css"
import { Link } from "gatsby"

export const Pager: React.FC<Props> = ({ prev, next }) => {
  return (
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
  )
}

const style = {
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

interface Props {
  next: any
  prev: any
}
