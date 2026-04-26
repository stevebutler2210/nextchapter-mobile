import { create } from "zustand"
import * as SecureStore from "expo-secure-store"
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
    if (token) api.setAuthToken(token)
    set({ token, hydrated: true })
  },
}))
