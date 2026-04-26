import { StyleSheet } from "react-native"

import { AuthHeader } from "@/components/Auth/AuthHeader"
import { SignInForm } from "@/components/Auth/SignInForm"
import { Screen } from "@/components/Screen"

type SignInScreenProps = {
  loading: boolean
  error: string | null
  onSignIn: (email: string, password: string) => void
  onSignUp: () => void
}

export function SignInScreen({ loading, error, onSignIn, onSignUp }: SignInScreenProps) {
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.content}>
      <AuthHeader variant="sign-in" />

      <SignInForm loading={loading} error={error} onSubmit={onSignIn} onSignUp={onSignUp} />
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
  },
})
