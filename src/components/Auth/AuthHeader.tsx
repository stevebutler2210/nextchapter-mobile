import { StyleSheet } from "react-native"

import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"

type AuthHeaderProps = {
  variant: "sign-in" | "sign-up"
}

export function AuthHeader({ variant }: AuthHeaderProps) {
  return (
    <>
      <Text
        className={cn(
          "text-center text-3xl text-on-surface",
          variant === "sign-in" ? "mt-20" : "mt-14",
        )}
        style={styles.titleFont}
      >
        NextChapter
      </Text>
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
