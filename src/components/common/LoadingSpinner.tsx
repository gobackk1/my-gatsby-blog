import React from "react"
import Loader from "react-loaders"
import "loaders.css/src/animations/ball-pulse.scss"
import { css } from "@emotion/core"
import { COLOR } from "@/styles"

export const LoadingSpinner: React.FC = () => (
  <div css={CSS["spinner"]}>
    <Loader type="ball-pulse" active={true} />
  </div>
)

const CSS = {
  spinner: css`
    .ball-pulse > div {
      background: ${COLOR.SPINNER};
      width: 10px;
      height: 10px;
    }
  `,
}
