import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from "react-native"

import { Screen } from "@/components/Screen"
import { StateBadge } from "@/components/StateBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Text } from "@/components/ui/text"
import { api } from "@/services/api"
import type { ClubSummary } from "@/services/api/types"
import { useAppTheme } from "@/theme/context"

function ClubCard({ club }: { club: ClubSummary }) {
  const state = club.current_cycle?.state ?? null
  return (
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
  )
}

function EmptyState() {
  return (
    <View className="items-center px-6 gap-3 mt-16">
      <Text className="text-xl text-on-surface text-center" style={styles.titleFont}>
        Your bookshelf is waiting.
      </Text>
      <Text className="text-sm text-outline text-center leading-relaxed">
        Start or join a club to begin your next chapter.
      </Text>
    </View>
  )
}

export default function Clubs() {
  const { theme } = useAppTheme()
  const colors = theme.colors
  const [clubs, setClubs] = useState<ClubSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchClubs = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    setError(null)

    const result = await api.getClubs()

    if (result.kind === "ok") {
      setClubs(result.data?.data ?? [])
    } else {
      setError("Could not load your clubs. Pull down to try again.")
    }

    if (isRefresh) setRefreshing(false)
    else setLoading(false)
  }, [])

  useEffect(() => {
    fetchClubs()
  }, [fetchClubs])

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.screenContent}>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={clubs}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ClubCard club={item} />}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <Text
              className="text-on-surface mt-12 mb-5 text-[28px] tracking-tight"
              style={styles.titleFont}
            >
              Your Clubs
            </Text>
          }
          ListEmptyComponent={
            error ? (
              <Text className="text-sm text-outline text-center mt-8">{error}</Text>
            ) : (
              <EmptyState />
            )
          }
          /* Commenting until Write pass is in place */
          // ListFooterComponent={
          //   <View className="items-center mt-8 mb-4">
          //     <TouchableOpacity
          //       className="bg-primary rounded-sm px-7 py-3.5"
          //       activeOpacity={0.8}
          //     >
          //       <Text
          //         className="text-on-primary text-xs font-medium uppercase tracking-widest"
          //         style={{ fontFamily: "workSansMedium" }}
          //       >
          //         Create a Club
          //       </Text>
          //     </TouchableOpacity>
          //   </View>
          // }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchClubs(true)}
              tintColor={colors.primary}
            />
          }
        />
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  screenContent: {
    flex: 1,
  },
  titleFont: {
    fontFamily: "newsreaderRegular",
  },
})
