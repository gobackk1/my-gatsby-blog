import React from "react"
import css from "@emotion/css"
import { Link } from "gatsby"
import { COLOR, MEDIA } from "@/styles"

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
    overflow: hidden;
    ${MEDIA.SP} {
      margin-bottom: 20px;
    }
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
    font-size: 14px;
    ${MEDIA.PC} {
      display: flex;
      justify-content: space-between;
    }
    ${MEDIA.SP} {
      &::after {
        content: "";
        display: block;
        clear: both;
      }
    }
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
    ${MEDIA.SP} {
      float: right;
    }
  `,
}

interface Props {
  next: {
    slug: string
    title: string
  }
  prev: {
    slug: string
    title: string
  }
}
