import React from "react"
import { Link } from "gatsby"
import { ITag } from "@/interfaces"
import css from "@emotion/css"
import { COLOR } from "@/styles"

export const Tag: React.FC<ITag> = ({ name, slug, count }) => {
  return (
    <Link to={`/tags/${slug}`} css={style.tag}>
      {name}
      {count && `(${count})`}
    </Link>
  )
}

const style = {
  tag: css`
    padding: 5px 10px;
    background-color: ${COLOR.ACCENT};
    color: ${COLOR.BLACK};
  `,
}
