import { StyleSheet, View } from "react-native"

import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"

type AvatarProps = {
  label: string
  backgroundColor: string
  overlap?: boolean
  zIndex?: number
  textClassName?: string
}

const mediumFont = { fontFamily: "workSansMedium" } as const

export function Avatar({
  label,
  backgroundColor,
  overlap = false,
  zIndex = 1,
  textClassName = "text-on-primary",
}: AvatarProps) {
  const dynamicStyle = { backgroundColor, zIndex }

  return (
    <View
      className="h-8 w-8 rounded-full border-2 border-surface items-center justify-center"
      style={[dynamicStyle, overlap ? styles.overlap : undefined]}
    >
      <Text className={cn("text-[10px] tracking-[0.03em]", textClassName)} style={mediumFont}>
        {label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  overlap: {
    marginLeft: -8,
  },
})
