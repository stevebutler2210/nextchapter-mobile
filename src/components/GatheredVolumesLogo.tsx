import Svg, { Rect } from "react-native-svg"

import { colors } from "@stevebutler2210/nextchapter-design-tokens/tokens"

type GatheredVolumesLogoProps = {
  size?: number
}

export function GatheredVolumesLogo({ size = 28 }: GatheredVolumesLogoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Rect
        x={5}
        y={5}
        width={6}
        height={22}
        rx={1.5}
        fill={colors.primary}
        transform="rotate(-4 8 16)"
      />
      <Rect
        x={12}
        y={4}
        width={6.5}
        height={23}
        rx={1.5}
        fill={colors.tertiary}
        transform="rotate(1 15 16)"
      />
      <Rect
        x={20}
        y={5.5}
        width={6}
        height={21}
        rx={1.5}
        fill={colors.surfaceContainerHighest}
        transform="rotate(5 23 16)"
      />
    </Svg>
  )
}
