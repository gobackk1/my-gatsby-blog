import React from "react"
import { css } from "@emotion/core"
import { SETTING } from "@/styles"
import { tagList } from "@/styles/common"
import { useStaticQuery, graphql } from "gatsby"
import { ITag } from "@/interfaces"
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

  const tags: ITag[] = data.allContentfulTag.nodes

  return (
    <footer css={style.footer}>
      {tags && (
        <ul css={tagList}>
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

const style = {
  footer: css`
    margin: 0 auto;
    max-width: ${SETTING.CONTAINER.WIDTH}px;
    width: 96%;
  `,
}
