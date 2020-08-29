import { Link } from "gatsby"
import React from "react"
import { css } from "@emotion/core"
import { COLOR } from "@/styles"
import { Search } from "@/components"

export const Header: React.FC<Props> = ({ siteTitle }) => (
  <header css={style.header}>
    <h1>
      <Link to="/">{siteTitle}</Link>
    </h1>
    <ul css={style.menuList}>
      <li>
        <Search />
      </li>
      <li>
        <Link to="/work/">work</Link>
      </li>
    </ul>
  </header>
)

type Props = {
  siteTitle: string
}

const style = {
  header: css`
    padding: 20px;
    background-color: ${COLOR.HEADER.BG};
    color: ${COLOR.HEADER.TEXT};
    display: flex;
    justify-content: space-between;
    font-weight: bold;
  `,
  menuList: css`
    display: flex;
  `,
}
