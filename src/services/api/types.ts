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

export interface ClubSummary {
  id: number
  name: string
  description: string
  role: string
  current_cycle: {
    id: number
    state: "nominating" | "voting" | "reading"
    nominations_count: number
  } | null
}

export interface ClubsResponse {
  data: ClubSummary[]
}
