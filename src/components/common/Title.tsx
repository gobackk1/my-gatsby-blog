import React from "react"
import css from "@emotion/css"

export const Title: React.FC<Props> = ({ type, children }) => {
  switch (type) {
    case "h1":
      return <h1 css={CSS["h1"]}>{children}</h1>
    case "h2":
      return <h2 css={CSS["h2"]}>{children}</h2>
    case "h3":
      return <h3 css={CSS["h3"]}>{children}</h3>
    case "h4":
      return <h4 css={CSS["h4"]}>{children}</h4>

    default:
      return null
  }
}

const common = css`
  font-weight: bold;
  padding-bottom: 10px;
  margin-bottom: 1em;
`

const CSS = {
  h1: css`
    ${common};
    font-size: 24px;
  `,
  h2: css`
    ${common};
    font-size: 24px;
  `,
  h3: css`
    ${common};
    font-size: 20px;
  `,
  h4: css`
    ${common};
    font-size: 18px;
  `,
}
type Props = {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}
