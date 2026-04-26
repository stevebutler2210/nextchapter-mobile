import * as SecureStore from "expo-secure-store"
import { create } from "zustand"

import { api } from "@/services/api"

const TOKEN_KEY = "auth_token"
const REFRESH_TOKEN_KEY = "refresh_token"

interface AuthState {
  token: string | null
  hydrated: boolean
  setTokens: (token: string, refreshToken: string) => Promise<void>
  clearTokens: () => Promise<void>
  rehydrate: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  hydrated: false,

  setTokens: async (token, refreshToken) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token)
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken)
    api.setAuthToken(token)
    set({ token })
  },

  clearTokens: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY)
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
    api.clearAuthToken()
    set({ token: null })
  },

  rehydrate: async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY)
    if (token) {
      api.setAuthToken(token)
      api.setupInterceptors(async () => {
        const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)

        // TODO: Remove these logs once we're confident the refresh flow is working correctly
        console.log("Attempting token refresh with refresh token:", refreshToken)
        console.log(
          "Current auth header before refresh attempt:",
          api.apisauce.headers["Authorization"],
        )
        console.log("Auth token in store before refresh attempt:", api.apisauce.headers["Authorization"]?.replace("Bearer ", ""))

        if (!refreshToken) return false

        const response = await api.apisauce.post<any>("/api/v1/sessions/refresh", {
          refresh_token: refreshToken,
        })

        if (response.ok && response.data?.data?.token) {
          const { token: newToken, refresh_token: newRefreshToken } = response.data.data
          await SecureStore.setItemAsync(TOKEN_KEY, newToken)
          await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefreshToken)
          api.setAuthToken(newToken)
          return true
        }

        // Refresh failed — clear everything and force sign-out
        await SecureStore.deleteItemAsync(TOKEN_KEY)
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
        api.clearAuthToken()
        set({ token: null })
        return false
      })
    }
    set({ token, hydrated: true })
  },
}))
