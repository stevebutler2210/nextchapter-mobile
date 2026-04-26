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
  background: "#1c1c1a",
  text: "#f7f4f0",
  textDim: "#85827e",
  tint: "#f4ebe9",
  separator: "#4a4745",
  palette: {
    neutral100: "#f7f4f0",
    neutral200: "#2e2c2a",
    neutral300: "#4a4745",
    neutral400: "#85827e",
    neutral500: "#dbd8d4",
    neutral600: "#e5e2de",
    neutral700: "#e5e2de",
    neutral800: "#f0ede9",
    neutral900: "#ffffff",
    secondary500: "#f4ebe9",
    accent100: "#2e2c2a",
  },
} as const
