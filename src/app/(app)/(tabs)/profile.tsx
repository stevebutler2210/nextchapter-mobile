import { View } from "react-native"
import { router } from "expo-router"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/Text"
import { useAuthStore } from "@/stores/authStore"

export default function Profile() {
  const clearTokens = useAuthStore((state) => state.clearTokens)

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={async () => {
        await clearTokens()
        router.replace("/(auth)/sign-in" as any)
      }}>
        <Text>Sign Out</Text>
      </Button>
    </View>
  )
}
