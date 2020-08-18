import React from "react"
import { css } from "@emotion/core"
import { SETTING } from "@/styles"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "@reach/router"

const style = {
  footer: css`
    margin: 0 auto;
    max-width: ${SETTING.CONTAINER.WIDTH}px;
    width: 96%;
  `,
}

export const Footer: React.FC = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulTag {
        nodes {
          name
          slug
        }
      }
    }
  `)
  const tags = data.allContentfulTag.nodes

  return (
    <footer css={style.footer}>
      {tags &&
        tags.map(({ name, slug }, i) => (
          <div key={i}>
            <Link to={`/tags/${slug}`}>{name}</Link>
          </div>
        ))}
    </footer>
  )
}
