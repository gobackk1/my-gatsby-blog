import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, graphql } from "gatsby"
import * as I from "@/interfaces"
import { Tag, Title } from "@/components"

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
      <Title type="h2">タグ</Title>
      {tags && (
        <ul css={CSS["footer-tag-list"]}>
          {tags.map(({ name, slug, blog_post }, i) => (
            <li key={i}>
              <Tag
                name={name}
                slug={slug}
                count={blog_post ? blog_post.length : 0}
              />
            </li>
          ))}
        </ul>
      )}
    </footer>
  )
}

const CSS = {
  footer: css``,
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
