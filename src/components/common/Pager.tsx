import React from "react"
import css from "@emotion/css"
import { Link } from "gatsby"

export const Pager: React.FC<Props> = ({ prev, next }) => {
  return (
    <div css={CSS["pager"]}>
      <div>
        {next && (
          <Link css={CSS["pager-next"]} to={`/posts/${next.slug}`}>
            {next.title}
          </Link>
        )}
      </div>
      <div>
        {prev && (
          <Link css={CSS["pager-prev"]} to={`/posts/${prev.slug}`}>
            {prev.title}
          </Link>
        )}
      </div>
    </div>
  )
}

const common = {
  pager: css`
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-right: 1px solid;
    border-bottom: 1px solid;
  `,
}

const CSS = {
  pager: css`
    display: flex;
    justify-content: space-between;
  `,
  "pager-next": css`
    &::before {
      ${common.pager}
      transform: rotate(135deg);
    }
  `,
  "pager-prev": css`
    &::after {
      ${common.pager}
      transform: rotate(-45deg);
    }
  `,
}

interface Props {
  next: any
  prev: any
}
