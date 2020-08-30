import React from "react"
import { Link } from "gatsby"
import { ITag } from "@/interfaces"

export const Tag: React.FC<ITag> = ({ name, slug, count }) => {
  return (
    <Link to={`/tags/${slug}`}>
      {name}
      {count && `(${count})`}
    </Link>
  )
}
