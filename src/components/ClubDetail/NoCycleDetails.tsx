import { View } from "react-native"

import { Text } from "@/components/ui/text"

const newsreaderRegular = { fontFamily: "newsreaderRegular" } as const

export function NoCycleDetails({ role }: { role: string }) {
  const isOwner = role === "owner"

  return (
    <View className="items-center px-6 gap-3 mt-16">
      <Text className="text-xl text-on-surface text-center" style={newsreaderRegular}>
        No active cycle
      </Text>
      <Text className="text-sm text-outline text-center leading-relaxed">
        {isOwner
          ? "Start a new cycle on the web app at nextchapter.fly.dev"
          : "Ask your club owner to start a new cycle"}
      </Text>
    </View>
  )
}
