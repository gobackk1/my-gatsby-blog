/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Header, Footer } from "@/components"
import { css } from "@emotion/core"
import { SETTING, COLOR } from "@/styles"

const style = {
  container: css`
    margin: 0 auto;
    max-width: ${SETTING.CONTAINER.WIDTH}px;
    width: 96%;
    padding: 30px;
    min-height: 800px;
  `,
  wrapper: css`
    background-color: ${COLOR.SITE.BG};
    color: ${COLOR.SITE.TEXT};
    min-height: 1000px;
  `,
}

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
    <div css={style.wrapper}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div css={style.container}>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  )
}
