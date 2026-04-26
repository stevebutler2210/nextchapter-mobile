import { useCallback, useEffect, useState } from "react"
import { router } from "expo-router"

import { ClubsScreen } from "@/screens/ClubsScreen"
import { api } from "@/services/api"
import type { ClubSummary } from "@/services/api/types"

export default function Clubs() {
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
    <ClubsScreen
      clubs={clubs}
      loading={loading}
      refreshing={refreshing}
      error={error}
      onClubPress={(id) => router.push(`/(app)/club/${id}`)}
      onRefresh={() => fetchClubs(true)}
    />
  )
}
