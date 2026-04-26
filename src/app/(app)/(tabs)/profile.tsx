import { StyleSheet, View } from "react-native"
import { router } from "expo-router"

import { Text } from "@/components/Text"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/authStore"

export default function Profile() {
  const clearTokens = useAuthStore((state) => state.clearTokens)

  return (
    <View style={styles.container}>
      <Button
        onPress={async () => {
          await clearTokens()
          router.replace("/(auth)/sign-in" as any)
        }}
      >
        <Text>Sign Out</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})
