import { create } from "zustand"
import * as SecureStore from "expo-secure-store"

const TOKEN_KEY = "auth_token"

interface AuthState {
  token: string | null
  hydrated: boolean
  setToken: (token: string) => Promise<void>
  clearToken: () => Promise<void>
  rehydrate: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  hydrated: false,

  setToken: async (token) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token)
    set({ token })
  },

  clearToken: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY)
    set({ token: null })
  },

  rehydrate: async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY)
    set({ token, hydrated: true })
  },
}))
