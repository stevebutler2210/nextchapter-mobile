import { useState } from "react"
import { View, ActivityIndicator } from "react-native"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Text } from "@/components/ui/text"
import { useAppTheme } from "@/theme/context"

import { inputClassName, labelClassName } from "./authFormStyles"

type SignInFormProps = {
  loading: boolean
  error: string | null
  onSubmit: (email: string, password: string) => void
  onSignUp: () => void
}

export function SignInForm({ loading, error, onSubmit, onSignUp }: SignInFormProps) {
  const { theme } = useAppTheme()
  const colors = theme.colors
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
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
        onPress={() => onSubmit(email, password)}
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

      <Text className="text-center text-sm text-outline">
        Don&apos;t have an account?{" "}
        <Text className="text-primary text-sm font-medium" onPress={onSignUp}>
          Sign up
        </Text>
      </Text>
    </View>
  )
}
