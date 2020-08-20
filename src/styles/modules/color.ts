const PRIMARY = "#3a3a3a"
const ACCENT = "#ff9800"
const BLUE = "#2700f5"
const BLACK = "#000000"
const WHITE = "#ffffff"

export const COLOR = {
  PRIMARY,
  ACCENT,
  BLUE,
  BLACK,
  WHITE,

  SITE: {
    BG: PRIMARY,
    TEXT: WHITE,
    TEXT_REVERSAL: BLACK,
  },

  HEADER: {
    BG: PRIMARY,
    TEXT: WHITE,
  },

  CODE_BLOCK: {
    HIGHLIGHT: "#3c5561",
  },
} as const
