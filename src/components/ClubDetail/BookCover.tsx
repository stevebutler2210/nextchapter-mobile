import { useMemo, useState } from "react"
import { Image, View } from "react-native"

import { Text } from "@/components/ui/text"
import Config from "@/config"
import { cn } from "@/lib/utils"
import type { BookData } from "@/services/api/types"

type BookCoverProps = {
  book: BookData
  size: "sm" | "lg"
}

function Placeholder({ size }: { size: "sm" | "lg" }) {
  const sizeClass = size === "lg" ? "h-[90px] w-16" : "h-[62px] w-11 mt-1"

  return (
    <View
      className={cn(
        sizeClass,
        "rounded-[2px] bg-surface-container-high items-center justify-center",
      )}
    >
      <Text className="text-outline text-base">📖</Text>
    </View>
  )
}

export function BookCover({ book, size }: BookCoverProps) {
  const [hasError, setHasError] = useState(false)
  const sizeClass = size === "lg" ? "h-[90px] w-16" : "h-[62px] w-11 mt-1"

  const uri = useMemo(() => {
    if (!book.cover_url) return null
    return book.cover_url.startsWith("http") ? book.cover_url : `${Config.API_URL}${book.cover_url}`
  }, [book.cover_url])

  if (!uri || hasError) return <Placeholder size={size} />

  return (
    <Image
      source={{ uri }}
      className={cn(sizeClass, "rounded-[2px]")}
      resizeMode="cover"
      onError={() => setHasError(true)}
    />
  )
}
