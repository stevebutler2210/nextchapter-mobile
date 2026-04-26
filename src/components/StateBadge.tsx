import { StyleSheet, View } from "react-native"

import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"

type ClubState = "nominating" | "voting" | "reading"

const BADGE_CLASSES: Record<ClubState, { bg: string; text: string; label: string }> = {
  nominating: { bg: "bg-tertiary-container", text: "text-tertiary", label: "Nominating" },
  voting: { bg: "bg-surface-container-high", text: "text-on-surface", label: "Voting" },
  reading: { bg: "bg-primary-container", text: "text-primary", label: "Reading" },
}

export function StateBadge({ state }: { state: ClubState }) {
  const badge = BADGE_CLASSES[state]
  return (
    <View className={cn("self-start rounded-full px-2.5 py-1", badge.bg)}>
      <Text
        className={cn("text-[10px] font-medium uppercase tracking-widest", badge.text)}
        style={styles.labelFont}
      >
        {badge.label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  labelFont: {
    fontFamily: "workSansMedium",
  },
})

export type { ClubState }
