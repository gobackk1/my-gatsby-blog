import css from "@emotion/css"

export const global = css`
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
`
