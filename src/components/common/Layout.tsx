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
import { SETTING, COLOR, reset } from "@/styles"
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
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

const CSS = {
  global: css`
    ${reset}
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
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
}
