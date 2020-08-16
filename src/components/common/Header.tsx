import { Link } from "gatsby"
import React from "react"
// import style from "styled-jsx"
import { css } from "@emotion/core"
import { COLOR } from "@/styles/emotion"

type Props = {
  siteTitle: string
}

const style = css`
  background-color: ${COLOR.BLUE};
`

export const Header: React.FC<Props> = ({ siteTitle }) => (
  <header css={style}>
    <h1 style={{ margin: 0 }}>
      <Link
        to="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        {siteTitle}
      </Link>
    </h1>
  </header>
)
