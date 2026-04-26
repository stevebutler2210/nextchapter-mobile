import { useState } from "react"
import { router } from "expo-router"

import { SignInScreen } from "@/screens/SignInScreen"
import { api } from "@/services/api"
import { useAuthStore } from "@/stores/authStore"

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setTokens = useAuthStore((state) => state.setTokens)

  async function handleSignIn(email: string, password: string) {
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
    <SignInScreen
      loading={loading}
      error={error}
      onSignIn={handleSignIn}
      onSignUp={() => router.push("/(auth)/sign-up")}
    />
  )
}
