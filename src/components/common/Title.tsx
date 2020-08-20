import React from "react"
import css from "@emotion/css"
import { COLOR } from "@/styles"

type Props = {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const common = css`
  color: ${COLOR.WHITE};
  margin-bottom: 1em;
`

const style = {
  h1: css`
    ${common};
    padding-bottom: 10px;
    font-weight: bold;
    font-size: 24px;
  `,
  h2: css`
    ${common};
    padding-bottom: 10px;
    font-weight: bold;
    font-size: 24px;
  `,
  h3: css`
    ${common};
    ${common};
    padding-bottom: 10px;
    font-weight: bold;
    font-size: 20px;
  `,
}

export const Title: React.FC<Props> = ({ type, children }) => {
  switch (type) {
    case "h1":
      return <h1 css={style.h1}>{children}</h1>
    case "h2":
      return <h2 css={style.h2}>{children}</h2>
    case "h3":
      return <h3 css={style.h3}>{children}</h3>

    default:
      return null
  }
}
