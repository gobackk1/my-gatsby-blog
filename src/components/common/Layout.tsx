/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Header, Footer } from "@/components"
import { css, Global } from "@emotion/core"
import { SETTING, COLOR, reset, global } from "@/styles"
import "github-markdown-css"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

export const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div css={CSS["wrapper"]}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Global styles={CSS["global"]} />
      <div css={CSS["container"]}>
        <main css={CSS["main"]}>{children}</main>
        <Footer />
      </div>
      <div css={CSS["overlay"]}></div>
    </div>
  )
}

const CSS = {
  global: css`
    ${reset}
    ${global}
  `,
  wrapper: css`
    background-color: ${COLOR.SITE.BG};
    color: ${COLOR.SITE.TEXT};
    min-height: 1000px;
    font-size: ${SETTING.FONT_SIZE}px;
    line-height: 1.8;
  `,
  container: css`
    margin: 0 auto;
    max-width: ${SETTING.CONTAINER.WIDTH}px;
    width: 96%;
    padding: 30px;
    min-height: 800px;
  `,
  main: css`
    margin-bottom: 80px;
  `,
  overlay: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    z-index: ${SETTING.LAYER.OVERLAY};
    .is-drawer-active & {
      display: block;
      background: #000000;
      opacity: 0.4;
    }
  `,
}
