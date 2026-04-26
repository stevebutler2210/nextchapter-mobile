import { useEffect } from "react"
import { Slot } from "expo-router"
import { router } from "expo-router"

import { useAuthStore } from "@/stores/authStore"

export default function AppLayout() {
  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    if (!token) router.replace("/(auth)/sign-in")
  }, [token])

  return <Slot />
}
