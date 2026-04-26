import { colors as designTokens } from "@stevebutler2210/nextchapter-design-tokens/tokens"

/**
 * Design tokens are the single source of truth.
 * Re-export directly with minimal app-specific additions.
 */
export const colors = {
  // Design system tokens (source of truth)
  ...designTokens,

  // App-specific semantic colors (map to design tokens)
  transparent: "rgba(0, 0, 0, 0)",
  error: "#C03403",
  errorBackground: "#F2D6CD",

  // Legacy semantic aliases (used by scaffolded components)
  // TODO: Migrate scaffolded components to use design tokens and remove these aliases
  background: "#fcf9f5",
  text: "#1c1c1a",
  textDim: "#85827e",
  tint: "#89453a",
  separator: "#dbd8d4",
  palette: {
    neutral100: "#ffffff",
    neutral200: "#f7f4f0",
    neutral300: "#e5e2de",
    neutral400: "#dbd8d4",
    neutral500: "#85827e",
    neutral600: "#65625f",
    neutral700: "#4a4745",
    neutral800: "#2e2c2a",
    neutral900: "#1c1c1a",
    secondary500: "#89453a",
    accent100: "#f4ebe9",
  },
} as const
