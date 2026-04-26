import { StyleSheet, View } from "react-native"

import { Text } from "@/components/ui/text"

export function EmptyClubsState() {
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

const styles = StyleSheet.create({
  titleFont: {
    fontFamily: "newsreaderRegular",
  },
})
