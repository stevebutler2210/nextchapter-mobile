import { View } from "react-native"

import { Text } from "@/components/ui/text"
import type { NominationData } from "@/services/api/types"

import { BookCover } from "./BookCover"

const newsreaderRegular = { fontFamily: "newsreaderRegular" } as const
const workSansMedium = { fontFamily: "workSansMedium" } as const

export function NominatingDetails({ nominations }: { nominations: NominationData[] }) {
  return (
    <View className="gap-0">
      {nominations.map((nomination) => (
        <View key={nomination.id} className="flex-row items-start gap-3 py-4">
          <BookCover book={nomination.book} size="sm" />
          <View className="flex-1">
            <Text className="text-base text-on-surface" style={newsreaderRegular}>
              {nomination.book.title}
            </Text>
            <Text className="text-sm text-outline">{nomination.book.authors}</Text>
            <Text
              className="text-[10px] text-outline uppercase tracking-tight mt-1"
              style={workSansMedium}
            >
              Nominated by {nomination.nominated_by.name}
            </Text>
          </View>
        </View>
      ))}
      <Text className="text-xs text-outline text-center mt-6" style={workSansMedium}>
        Visit nextchapter.fly.dev to nominate
      </Text>
    </View>
  )
}
