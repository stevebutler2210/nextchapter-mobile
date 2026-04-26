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
} as const
