import React from "react"
import { Link } from "gatsby"
import * as I from "@/interfaces"
import { COLOR } from "@/styles"
import { css } from "@emotion/core"

export const Tag: React.FC<I.Tag> = ({ name, slug, count }) => {
  if (count === undefined) {
    return (
      <Link css={CSS["tag"]} to={`/tags/${slug}`}>
        {name}
      </Link>
    )
  } else {
    return count === 0 ? null : (
      <Link css={CSS["tag"]} to={`/tags/${slug}`}>
        {name}
        {count && ` (${count})`}
      </Link>
    )
  }
}

const CSS = {
  tag: css`
    background: ${COLOR.ACCENT};
    color: ${COLOR.SITE.TAG_TEXT};
    padding: 5px;
    font-weight: bold;
  `,
}
