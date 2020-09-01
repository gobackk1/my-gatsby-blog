import css from "@emotion/css"
import { MEDIA } from "@/styles"

export const global = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  a {
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
    ${MEDIA.PC} {
      text-decoration: none;
    }
  }
  button {
    padding: 0;
    border: none;
    background: none;
  }

  html {
    &.is-drawer-active {
      overflow: hidden;
    }
  }

  iframe {
    ${MEDIA.SP} {
      width: 100%;
    }
  }
`
