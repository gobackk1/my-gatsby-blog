import React from "react"
import { css } from "@emotion/core"

export const ScreenReaderText: React.FC = ({ children }) => {
  return <span css={CSS["screen-reader-text"]}>{children}</span>
}

const CSS = {
  "screen-reader-text": css`
    clip: rect(1px, 1px, 1px, 1px);
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
  `,
}
