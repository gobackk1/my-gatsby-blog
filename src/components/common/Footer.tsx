import React from "react"
import { css } from "@emotion/core"
import { SETTING } from "@/styles"
import { useStaticQuery, graphql } from "gatsby"
import * as I from "@/interfaces"
import { Tag } from "@/components"

export const Footer: React.FC = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulTag {
        nodes {
          name
          slug
          blog_post {
            id
          }
        }
      }
    }
  `)

  const tags: I.Tag[] = data.allContentfulTag.nodes

  return (
    <footer css={CSS["footer"]}>
      {tags && (
        <ul css={CSS["footer-tag-list"]}>
          {tags.map(({ name, slug, blog_post }, i) => (
            <li key={i}>
              <Tag name={name} slug={slug} count={blog_post!.length} />
            </li>
          ))}
        </ul>
      )}
    </footer>
  )
}

const CSS = {
  footer: css`
    margin: 0 auto;
    max-width: ${SETTING.CONTAINER.WIDTH}px;
    width: 96%;
  `,
  "footer-tag-list": css`
    display: flex;
    > li {
      margin: 0 10px 10px 0;
      a {
        display: block;
      }
    }
  `,
}
