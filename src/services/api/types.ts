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

export interface ClubDetail {
  id: number
  name: string
  description: string
  role: string
  members: { id: number; name: string; role: string }[]
  current_cycle: CycleDetail | null
}

export interface CycleDetail {
  id: number
  state: "nominating" | "voting" | "reading"
  winning_book: BookData | null
  nominations: NominationData[]
}

export interface NominationData {
  id: number
  book: BookData
  nominated_by: { id: number; name: string }
  votes_count: number
}

export interface BookData {
  id: number
  title: string
  authors: string | null
  cover_url: string | null
  page_count: number | null
}
