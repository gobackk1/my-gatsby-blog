import { css } from "@emotion/core"
import { COLOR } from "@/styles"
import { MEDIA } from "./media"

export const markdown = css`
  code {
    font-family: monaco, monospace;
  }

  pre {
    ${MEDIA.SP} {
      font-size: 14px;
    }
  }

  h2 {
    border-color: ${COLOR.SKY_BLUE};
  }

  *:not(code) {
    color: ${COLOR.SITE.TEXT};
  }

  table td,
  table th {
    color: ${COLOR.SITE.TEXT_REVERSAL};
  }

  .gatsby-highlight-code-line {
    background-color: ${COLOR.CODE_BLOCK.HIGHLIGHT};
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid ${COLOR.CODE_BLOCK.HIGHLIGHT};
  }

  .gatsby-highlight {
    background-color: #2d2d2d;
    border-radius: 0.3em;
    margin: 0.5em 0;
    padding: 1em;
    overflow: auto;
  }

  .gatsby-highlight pre[class*="language-"] {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left;
    min-width: 100%;
  }

  .gatsby-highlight pre[class*="language-"].line-numbers {
    padding-left: 2.8em;
  }
`
