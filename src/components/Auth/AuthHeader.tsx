import { StyleSheet, View } from "react-native"

import { GatheredVolumesLogo } from "@/components/GatheredVolumesLogo"
import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"

type AuthHeaderProps = {
  variant: "sign-in" | "sign-up"
}

export function AuthHeader({ variant }: AuthHeaderProps) {
  return (
    <>
      <View
        className={cn(
          "flex-row items-center justify-center gap-2",
          variant === "sign-in" ? "mt-20" : "mt-14",
        )}
      >
        <View className="mb-1.5">
          <GatheredVolumesLogo size={32} />
        </View>
        <Text className="text-3xl text-on-surface" style={styles.titleFont}>
          NextChapter
        </Text>
      </View>
      <Text className="text-center text-sm text-outline mt-2" style={styles.subtitleFont}>
        A quiet space for intentional readers
      </Text>
    </>
  )
}

const styles = StyleSheet.create({
  subtitleFont: {
    fontFamily: "newsreaderRegularItalic",
  },
  titleFont: {
    fontFamily: "newsreaderMedium",
  },
})
