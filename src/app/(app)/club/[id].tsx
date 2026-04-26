import { useCallback, useEffect, useState } from "react"
import { router, useLocalSearchParams } from "expo-router"

import { ClubDetailScreen } from "@/screens/ClubDetail"
import { api } from "@/services/api"
import type { ClubDetail } from "@/services/api/types"

export default function ClubDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [club, setClub] = useState<ClubDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchClub = useCallback(
    async (isRefresh = false) => {
      const numericId = Number(id)
      if (!numericId) {
        setError("Invalid club id.")
        if (isRefresh) setRefreshing(false)
        else setLoading(false)
        return
      }

      if (isRefresh) setRefreshing(true)
      else setLoading(true)
      setError(null)

      const result = await api.getClub(numericId)
      if (result.kind === "ok" && result.data) {
        setClub(result.data)
      } else {
        setError("Could not load club details.")
      }

      if (isRefresh) setRefreshing(false)
      else setLoading(false)
    },
    [id],
  )

  useEffect(() => {
    fetchClub()
  }, [fetchClub])

  return (
    <ClubDetailScreen
      club={club}
      loading={loading}
      refreshing={refreshing}
      error={error}
      onBack={() => router.back()}
      onRefresh={() => fetchClub(true)}
      onRetry={() => fetchClub(false)}
    />
  )
}
