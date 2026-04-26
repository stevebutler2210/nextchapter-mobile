import { StyleSheet, TouchableOpacity } from "react-native"

import { StateBadge } from "@/components/StateBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Text } from "@/components/ui/text"
import type { ClubSummary } from "@/services/api/types"

type ClubCardProps = {
  club: ClubSummary
  onPress: (id: number) => void
}

export function ClubCard({ club, onPress }: ClubCardProps) {
  const state = club.current_cycle?.state ?? null
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(club.id)}>
      <Card className="mb-3 rounded border-0 bg-surface-container-lowest px-0 shadow-none gap-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-normal text-on-surface" style={styles.titleFont}>
            {club.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="gap-2">
          {state ? <StateBadge state={state} /> : null}
          {club.description ? (
            <Text className="text-sm text-outline leading-relaxed">{club.description}</Text>
          ) : null}
        </CardContent>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  titleFont: {
    fontFamily: "newsreaderRegular",
  },
})
