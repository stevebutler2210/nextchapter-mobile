import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"

import { AvatarRow } from "@/components/ClubDetail/AvatarRow"
import { NoCycleDetails } from "@/components/ClubDetail/NoCycleDetails"
import { NominatingDetails } from "@/components/ClubDetail/NominatingDetails"
import { ReadingDetails } from "@/components/ClubDetail/ReadingDetails"
import { VotingDetails } from "@/components/ClubDetail/VotingDetails"
import { Screen } from "@/components/Screen"
import { StateBadge } from "@/components/StateBadge"
import { Text } from "@/components/ui/text"
import type { ClubDetail } from "@/services/api/types"
import { useAppTheme } from "@/theme/context"

const newsreaderRegular = { fontFamily: "newsreaderRegular" } as const
const workSansMedium = { fontFamily: "workSansMedium" } as const

type ClubDetailScreenProps = {
  club: ClubDetail | null
  loading: boolean
  refreshing: boolean
  error: string | null
  onBack: () => void
  onRefresh: () => void
  onRetry: () => void
}

export function ClubDetailScreen({
  club,
  loading,
  refreshing,
  error,
  onBack,
  onRefresh,
  onRetry,
}: ClubDetailScreenProps) {
  const { theme } = useAppTheme()
  const colors = theme.colors

  const cycle = club?.current_cycle ?? null

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.screenContent}>
      <TouchableOpacity
        onPress={onBack}
        className="px-5 pt-4 pb-2 self-start"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text className="text-sm text-outline">← Back</Text>
      </TouchableOpacity>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6 gap-4">
          <Text className="text-sm text-outline text-center">{error}</Text>
          <TouchableOpacity onPress={onRetry} className="mt-2">
            <Text className="text-sm text-primary" style={workSansMedium}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      ) : club ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
        >
          <View className="mb-4">
            <Text
              className="text-[24px] text-on-surface tracking-tight leading-tight"
              style={newsreaderRegular}
            >
              {club.name}
            </Text>

            {club.description ? (
              <Text className="text-sm text-outline leading-relaxed mt-2">{club.description}</Text>
            ) : null}

            <AvatarRow members={club.members} />
            {cycle ? <StateBadge state={cycle.state} /> : null}
          </View>

          {!cycle ? <NoCycleDetails role={club.role} /> : null}
          {cycle?.state === "nominating" ? (
            <NominatingDetails nominations={cycle.nominations} />
          ) : null}
          {cycle?.state === "voting" ? <VotingDetails nominations={cycle.nominations} /> : null}
          {cycle?.state === "reading" ? (
            <ReadingDetails winningBook={cycle.winning_book} nominations={cycle.nominations} />
          ) : null}
        </ScrollView>
      ) : null}
    </Screen>
  )
}

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
})
