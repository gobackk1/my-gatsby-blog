const PRIMARY = "#3a3a3a"
const ACCENT = "#ff9800"
const BLUE = "#2700f5"
const SKY_BLUE = "#00bcd4"
const BLACK = "#000000"
const WHITE = "#f1f1f1"
const LIGHT_GRAY = "#4e4c4c"

export const COLOR = {
  PRIMARY,
  ACCENT,
  BLUE,
  BLACK,
  WHITE,
  SKY_BLUE,
  LIGHT_GRAY,

  SITE: {
    BG: PRIMARY,
    TEXT: WHITE,
    TEXT_REVERSAL: BLACK,
    TAG_TEXT: PRIMARY,
  },

  HEADER: {
    BG: PRIMARY,
    TEXT: WHITE,
  },

  SPINNER: SKY_BLUE,

  CODE_BLOCK: {
    HIGHLIGHT: "#3c5561",
  },
} as const
