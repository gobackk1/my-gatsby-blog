import React from "react"
import { Link } from "gatsby"
import * as I from "@/interfaces"

export const Tag: React.FC<I.Tag> = ({ name, slug, count }) => {
  return (
    <Link to={`/tags/${slug}`}>
      {name}
      {count && `(${count})`}
    </Link>
  )
}
