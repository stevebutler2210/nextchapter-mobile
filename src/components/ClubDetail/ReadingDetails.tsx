import { View } from "react-native"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Text } from "@/components/ui/text"
import type { BookData, NominationData } from "@/services/api/types"

import { BookCover } from "./BookCover"

type ReadingDetailsProps = {
  winningBook: BookData | null
  nominations: NominationData[]
}

const newsreaderRegular = { fontFamily: "newsreaderRegular" } as const
const workSansMedium = { fontFamily: "workSansMedium" } as const

function resolveCurrentBook(winningBook: BookData | null, nominations: NominationData[]) {
  if (winningBook) return winningBook
  const topNomination = [...nominations].sort((a, b) => b.votes_count - a.votes_count)[0]
  return topNomination?.book ?? null
}

export function ReadingDetails({ winningBook, nominations }: ReadingDetailsProps) {
  const currentBook = resolveCurrentBook(winningBook, nominations)

  if (!currentBook) {
    return (
      <Text className="text-base text-outline text-center italic mt-8" style={newsreaderRegular}>
        No book selected yet.
      </Text>
    )
  }

  return (
    <View className="gap-4">
      <Card className="rounded border-0 bg-surface-container-lowest shadow-none gap-0">
        <CardHeader className="pb-0" />
        <CardContent className="flex-row items-center gap-4">
          <BookCover book={currentBook} size="lg" />
          <View className="flex-1">
            <CardTitle
              className="text-lg text-on-surface leading-snug font-normal"
              style={newsreaderRegular}
            >
              {currentBook.title}
            </CardTitle>
            <Text className="text-sm text-outline mt-1">{currentBook.authors}</Text>
            {currentBook.page_count ? (
              <Text className="text-xs text-outline mt-1">{currentBook.page_count} pages</Text>
            ) : null}
            <Text
              className="text-xs text-tertiary uppercase tracking-widest mt-2"
              style={workSansMedium}
            >
              Currently Reading
            </Text>
          </View>
        </CardContent>
      </Card>

      <Text className="text-xs text-outline text-center" style={workSansMedium}>
        Visit nextchapter.fly.dev to log notes
      </Text>
    </View>
  )
}
