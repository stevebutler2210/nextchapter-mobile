import { useState } from "react"
import { View, ActivityIndicator, StyleSheet } from "react-native"
import { router } from "expo-router"

import { Screen } from "@/components/Screen"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Text } from "@/components/ui/text"
import { api } from "@/services/api"
import { useAuthStore } from "@/stores/authStore"
import { useAppTheme } from "@/theme/context"

const inputClassName =
  "bg-surface-container border-outline-variant/50 rounded-sm h-[50px] px-[14px] text-sm text-on-surface"

const labelClassName = "text-xs uppercase tracking-[0.1em] text-on-surface"

export default function SignIn() {
  const { theme } = useAppTheme()
  const colors = theme.colors
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setTokens = useAuthStore((state) => state.setTokens)

  async function handleSignIn() {
    setLoading(true)
    setError(null)
    const result = await api.signIn(email, password)
    setLoading(false)

    if (result.kind === "ok") {
      await setTokens(result.data!.token, result.data!.refresh_token)
      router.replace("/(app)/(tabs)/clubs" as any)
    } else if (result.data?.error) {
      setError(result.data.error)
    } else {
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.content}>
      <Text className="text-center text-3xl text-on-surface mt-20" style={styles.titleFont}>
        NextChapter
      </Text>
      <Text className="text-center text-sm text-outline mt-2" style={styles.subtitleFont}>
        A quiet space for intentional readers
      </Text>

      <View className="mt-12 gap-6">
        {error && <Text className="text-primary text-sm text-center">{error}</Text>}

        <View className="gap-1.5">
          <Label htmlFor="email" className={labelClassName}>
            Email
          </Label>
          <Input
            id="email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            className={inputClassName}
          />
        </View>

        <View className="gap-1.5">
          <Label htmlFor="password" className={labelClassName}>
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className={inputClassName}
          />
        </View>

        <Button
          className="w-full bg-primary rounded-sm mt-2"
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.onPrimary} />
          ) : (
            <Text className="text-on-primary text-xs font-medium uppercase tracking-wider text-center">
              Sign In
            </Text>
          )}
        </Button>
      </View>

      <Text className="text-center text-sm text-outline mt-6">
        Don&apos;t have an account?{" "}
        <Text
          className="text-primary text-sm font-medium"
          onPress={() => router.push("/(auth)/sign-up" as any)}
        >
          Sign up
        </Text>
      </Text>
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
  },
  subtitleFont: {
    fontFamily: "newsreaderRegularItalic",
  },
  titleFont: {
    fontFamily: "newsreaderMedium",
  },
})
