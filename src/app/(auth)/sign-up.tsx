import { useState } from "react"
import { View, ActivityIndicator } from "react-native"
import { router } from "expo-router"
import { useAppTheme } from "@/theme/context"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Screen } from "@/components/Screen"
import { api } from "@/services/api"
import { useAuthStore } from "@/stores/authStore"

const inputClassName = "bg-surface-container border-outline-variant/50 rounded-sm h-[50px] px-[14px] text-sm text-on-surface"

const labelClassName = "text-xs uppercase tracking-[0.1em] text-on-surface"

export default function SignUp() {
  const { theme } = useAppTheme()
  const colors = theme.colors
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const setToken = useAuthStore((state) => state.setToken)

  async function handleSignUp() {
    setLoading(true)
    setError(null)
    setFieldErrors({})
    const result = await api.signUp(name, email, password)
    setLoading(false)

    if (result.kind === "ok") {
      await setToken(result.data!.token)
      router.replace("/(app)/(tabs)/clubs" as any)
    } else if (result.data?.errors) {
      setFieldErrors(result.data.errors as Record<string, string[]>)
      setError(result.data.error ?? "Please fix the errors below.")
    } else if (result.data?.error) {
      setError(result.data.error)
    } else {
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
    >
        <Text
          className="text-center text-3xl text-on-surface mt-14"
          style={{ fontFamily: 'newsreaderMedium' }}
        >
          NextChapter
        </Text>
        <Text
          className="text-center text-sm text-outline mt-2"
          style={{ fontFamily: 'newsreaderRegularItalic' }}
        >
          A quiet space for intentional readers
        </Text>

        <View className="mt-10 gap-5">
          {error && (
            <Text className="text-primary text-sm text-center">{error}</Text>
          )}

          <View className="gap-1.5">
            <Label htmlFor="name" className={labelClassName}>Name</Label>
            <Input
              id="name"
              placeholder="Your full name"
              value={name}
              onChangeText={setName}
              className={inputClassName}
            />
            {fieldErrors.name?.map((e) => (
              <Text key={e} className="text-primary text-xs">{e}</Text>
            ))}
          </View>

          <View className="gap-1.5">
            <Label htmlFor="email" className={labelClassName}>Email</Label>
            <Input
              id="email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              className={inputClassName}
            />
            {fieldErrors.email_address?.map((e) => (
              <Text key={e} className="text-primary text-xs">{e}</Text>
            ))}
          </View>

          <View className="gap-1.5">
            <Label htmlFor="password" className={labelClassName}>Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className={inputClassName}
            />
            {fieldErrors.password?.map((e) => (
              <Text key={e} className="text-primary text-xs">{e}</Text>
            ))}
          </View>

          <View className="gap-1.5">
            <Label htmlFor="confirm" className={labelClassName}>Confirm Password</Label>
            <Input
              id="confirm"
              placeholder="••••••••"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              className={inputClassName}
            />
          </View>

          <Button
            className="w-full bg-primary rounded-sm mt-2"
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color={colors.onPrimary} />
              : <Text className="text-on-primary text-xs font-medium uppercase tracking-wider text-center">Create Account</Text>
            }
          </Button>
        </View>

        <Text className="text-center text-sm text-outline mt-6">
          Already have an account?{" "}
          <Text
            className="text-primary text-sm font-medium"
            onPress={() => router.push("/(auth)/sign-in" as any)}
          >
            Sign in
          </Text>
        </Text>
    </Screen>
  )
}
