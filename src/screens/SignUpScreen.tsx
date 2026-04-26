import { StyleSheet } from "react-native"

import { AuthHeader } from "@/components/Auth/AuthHeader"
import { SignUpForm } from "@/components/Auth/SignUpForm"
import { Screen } from "@/components/Screen"

type SignUpScreenProps = {
  loading: boolean
  error: string | null
  fieldErrors: Record<string, string[]>
  onSignUp: (name: string, email: string, password: string) => void
  onSignIn: () => void
}

export function SignUpScreen({
  loading,
  error,
  fieldErrors,
  onSignUp,
  onSignIn,
}: SignUpScreenProps) {
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={styles.content}>
      <AuthHeader variant="sign-up" />

      <SignUpForm
        loading={loading}
        error={error}
        fieldErrors={fieldErrors}
        onSubmit={onSignUp}
        onSignIn={onSignIn}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
})
