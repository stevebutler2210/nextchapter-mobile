export interface ApiConfig {
  url: string
  timeout: number
}

export interface AuthResponse {
  token: string
  refresh_token: string
  expires_at: string
}

export interface ApiErrorResponse {
  error?: string
  errors?: Record<string, string[]>
}
