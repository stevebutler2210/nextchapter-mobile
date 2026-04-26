import { useState } from "react"
import { router } from "expo-router"

import { SignUpScreen } from "@/screens/SignUpScreen"
import { api } from "@/services/api"
import { useAuthStore } from "@/stores/authStore"

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const setTokens = useAuthStore((state) => state.setTokens)

  async function handleSignUp(name: string, email: string, password: string) {
    setLoading(true)
    setError(null)
    setFieldErrors({})
    const result = await api.signUp(name, email, password)
    setLoading(false)

    if (result.kind === "ok") {
      await setTokens(result.data!.token, result.data!.refresh_token)
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
    <SignUpScreen
      loading={loading}
      error={error}
      fieldErrors={fieldErrors}
      onSignUp={handleSignUp}
      onSignIn={() => router.push("/(auth)/sign-in")}
    />
  )
}
