import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import { css } from "@emotion/core"
import { COLOR, MEDIA, SETTING } from "@/styles"
import { Search } from "@/components"

export const Header: React.FC<Props> = ({ siteTitle }) => {
  const [isDrawerOpen, toggleDrawer] = useState(false)
  const drawerStatus = isDrawerOpen ? "is-drawer-active" : ""

  useEffect(() => {
    const html = document ? document.documentElement : null
    if (html) {
      isDrawerOpen
        ? html.classList.add("is-drawer-active")
        : html.classList.remove("is-drawer-active")
    }
  }, [isDrawerOpen])

  return (
    <header css={CSS["header"]}>
      <h1 css={CSS["header-logo"]}>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <div css={CSS["drawer"]} className={drawerStatus}>
        <ul css={CSS["drawer-menu"]}>
          <li>
            <Search />
          </li>
          <li>
            <Link to="/work/">work</Link>
          </li>
        </ul>
        <button
          css={CSS["drawer-button"]}
          type="button"
          className={drawerStatus}
          onClick={() => {
            toggleDrawer(!isDrawerOpen)
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

type Props = {
  siteTitle: string
}

const buttonWidth = 45

const CSS = {
  header: css`
    padding: 20px;
    background-color: ${COLOR.HEADER.BG};
    color: ${COLOR.HEADER.TEXT};
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    ${MEDIA.SP} {
      padding: 10px;
    }
  `,
  "header-logo": css`
    a {
      text-decoration: none;
    }
  `,
  drawer: css`
    ${MEDIA.SP} {
      position: relative;
      transform: translateX(300px);
      transition: 0.4s;
      display: block;
      background: #000;
      width: 300px;
      height: 100%;
      position: fixed;
      top: 0;
      right: 0;
      z-index: ${SETTING.LAYER.SP_DRAWER};
      li {
        height: 40px;
      }
    }
    &.is-drawer-active {
      transform: translateX(0px);
    }
  `,
  "drawer-menu": css`
    display: block;
    ${MEDIA.PC} {
      display: flex;
      li {
        margin-left: 10px;
      }
    }
    ${MEDIA.SP} {
      padding: 10px;
    }
  `,
  "drawer-button": css`
    display: inline-block;
    transition: all 0.5s;
    width: ${buttonWidth}px;
    height: 43px;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: -${buttonWidth}px;
    background: #000;
    span {
      width: 30px;
      display: inline-block;
      transition: all 0.5s;
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #fff;
      border-radius: 4px;
      z-index: 11;
      margin: 0 auto;
      &:nth-of-type(1) {
        top: 10px;
      }
      &:nth-of-type(2) {
        top: 20px;
      }
      &:nth-of-type(3) {
        top: 30px;
      }
    }
    &.is-drawer-active {
      span {
        &:nth-of-type(1) {
          transform: translate(-11px, 7px) rotate(-45deg);
          width: 10px;
        }
        &:nth-of-type(3) {
          transform: translate(-11px, -7px) rotate(45deg);
          width: 10px;
        }
      }
    }
  `,
}
