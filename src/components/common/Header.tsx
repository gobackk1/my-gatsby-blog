import { Link } from "gatsby"
import React from "react"
// import style from "styled-jsx"
import { css } from "@emotion/core"
import { COLOR } from "@/styles/emotion"

type Props = {
  siteTitle: string
}

const style = {
  header: css`
    padding: 20px;
    background-color: ${COLOR.HEADER.BG};
    color: ${COLOR.HEADER.TEXT};
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  `,
}

export const Header: React.FC<Props> = ({ siteTitle }) => (
  <header css={style.header}>
    <h1>
      <Link to="/">{siteTitle}</Link>
    </h1>
    <ul>
      <li>
        <Link to="/work/">work</Link>
      </li>
    </ul>
  </header>
)
