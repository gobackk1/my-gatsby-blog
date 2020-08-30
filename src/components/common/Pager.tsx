import React from "react"
import css from "@emotion/css"
import { Link } from "gatsby"
import { COLOR } from "@/styles"

export const Pager: React.FC<Props> = ({ prev, next }) => {
  return (
    <div css={CSS["pager"]}>
      {next ? (
        <Link css={CSS["pager-next"]} to={`/posts/${next.slug}`}>
          前の記事: {next.title}
        </Link>
      ) : (
        <div css={CSS["pager-next"]}>前の記事はありません。</div>
      )}
      {prev && (
        <Link css={CSS["pager-prev"]} to={`/posts/${prev.slug}`}>
          次の記事: {prev.title}
        </Link>
      )}
    </div>
  )
}

const common = {
  pager: css`
    display: block;
    width: 300px;
    padding: 5px;
    position: relative;
    background: ${COLOR.LIGHT_GRAY};
  `,
  pagerArrow: css`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
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
    font-size: 14px;
  `,
  "pager-next": css`
    ${common.pager}
    padding-left: 25px;
    &::before {
      ${common.pagerArrow}
      transform: rotate(135deg);
      left: 10px;
    }
  `,
  "pager-prev": css`
    ${common.pager}
    padding-right: 25px;
    &::after {
      ${common.pagerArrow}
      transform: rotate(-45deg);
      right: 10px;
    }
  `,
}

interface Props {
  next: any
  prev: any
}
