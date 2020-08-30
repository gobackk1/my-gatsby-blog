import React from "react"
import { Link } from "gatsby"
import * as I from "@/interfaces"
import { COLOR } from "@/styles"
import { css } from "@emotion/core"

export const Tag: React.FC<I.Tag> = ({ name, slug, count }) => {
  return (
    <Link css={CSS["tag"]} to={`/tags/${slug}`}>
      {name}
      {count && `(${count})`}
    </Link>
  )
}

const CSS = {
  tag: css`
    color: ${COLOR.ACCENT};
  `,
}
