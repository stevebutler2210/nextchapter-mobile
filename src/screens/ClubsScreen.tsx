import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from "react-native"

import { ClubCard } from "@/components/ClubsList/ClubCard"
import { EmptyClubsState } from "@/components/ClubsList/EmptyClubsState"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/ui/text"
import type { ClubSummary } from "@/services/api/types"
import { useAppTheme } from "@/theme/context"

type ClubsScreenProps = {
  clubs: ClubSummary[]
  loading: boolean
  refreshing: boolean
  error: string | null
  onClubPress: (id: number) => void
  onRefresh: () => void
}

export function ClubsScreen({
  clubs,
  loading,
  refreshing,
  error,
  onClubPress,
  onRefresh,
}: ClubsScreenProps) {
  const { theme } = useAppTheme()
  const colors = theme.colors

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
          renderItem={({ item }) => <ClubCard club={item} onPress={onClubPress} />}
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
              <EmptyClubsState />
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
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
