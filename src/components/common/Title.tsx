import React from "react"
import css from "@emotion/css"
import { COLOR } from "@/styles"

type Props = {
  type: "h2" | "h3" | "h4" | "h5" | "h6"
}

const common = `
  color: ${COLOR.WHITE};
`

const style = {
  h2: css`
    ${common};
    padding-bottom: 10px;
    font-weight: bold;
    font-size: 24px;
    /* border-bottom: 1px solid; */
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
    case "h2":
      return <h2 css={style.h2}>{children}</h2>
    case "h3":
      return <h3 css={style.h3}>{children}</h3>

    default:
      return null
  }
}
