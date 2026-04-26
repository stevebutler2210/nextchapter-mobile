import { useState } from "react"
import { View, ActivityIndicator } from "react-native"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Text } from "@/components/ui/text"
import { useAppTheme } from "@/theme/context"

import { inputClassName, labelClassName } from "./authFormStyles"

type SignUpFormProps = {
  loading: boolean
  error: string | null
  fieldErrors: Record<string, string[]>
  onSubmit: (name: string, email: string, password: string) => void
  onSignIn: () => void
}

export function SignUpForm({ loading, error, fieldErrors, onSubmit, onSignIn }: SignUpFormProps) {
  const { theme } = useAppTheme()
  const colors = theme.colors
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  return (
    <View className="mt-10 gap-5">
      {error && <Text className="text-primary text-sm text-center">{error}</Text>}

      <View className="gap-1.5">
        <Label htmlFor="name" className={labelClassName}>
          Name
        </Label>
        <Input
          id="name"
          placeholder="Your full name"
          value={name}
          onChangeText={setName}
          className={inputClassName}
        />
        {fieldErrors.name?.map((e) => (
          <Text key={e} className="text-primary text-xs">
            {e}
          </Text>
        ))}
      </View>

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
        {fieldErrors.email_address?.map((e) => (
          <Text key={e} className="text-primary text-xs">
            {e}
          </Text>
        ))}
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
        {fieldErrors.password?.map((e) => (
          <Text key={e} className="text-primary text-xs">
            {e}
          </Text>
        ))}
      </View>

      <View className="gap-1.5">
        <Label htmlFor="confirm" className={labelClassName}>
          Confirm Password
        </Label>
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
        onPress={() => onSubmit(name, email, password)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.onPrimary} />
        ) : (
          <Text className="text-on-primary text-xs font-medium uppercase tracking-wider text-center">
            Create Account
          </Text>
        )}
      </Button>

      <Text className="text-center text-sm text-outline">
        Already have an account?{" "}
        <Text className="text-primary text-sm font-medium" onPress={onSignIn}>
          Sign in
        </Text>
      </Text>
    </View>
  )
}
