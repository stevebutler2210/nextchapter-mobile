/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce"

import Config from "@/config"

import { getGeneralApiProblem, type GeneralApiProblem } from "./apiProblem"
import type { ApiConfig, ApiErrorResponse, AuthResponse, ClubDetail, ClubsResponse } from "./types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  private interceptorsSetUp = false

  setupInterceptors(refreshFn: () => Promise<boolean>) {
    if (this.interceptorsSetUp) return
    this.interceptorsSetUp = true

    this.apisauce.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url?.includes("/sessions/refresh")
        ) {
          originalRequest._retry = true
          const refreshed = await refreshFn()
          if (refreshed) {
            originalRequest.headers["Authorization"] = this.apisauce.headers["Authorization"]
            return this.apisauce.axiosInstance(originalRequest)
          }
        }
        return Promise.reject(error)
      },
    )
  }

  setAuthToken(token: string) {
    this.apisauce.setHeader("Authorization", `Bearer ${token}`)
  }

  clearAuthToken() {
    this.apisauce.deleteHeader("Authorization")
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<
    | { kind: "ok"; data: AuthResponse }
    | { kind: GeneralApiProblem["kind"]; data: ApiErrorResponse | undefined }
  > {
    const response = await this.apisauce.post<AuthResponse, ApiErrorResponse>("/api/v1/sessions", {
      email_address: email,
      password,
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      return { kind: problem?.kind ?? "unknown", data: response.data as ApiErrorResponse }
    }
    return { kind: "ok", data: (response.data as any).data as AuthResponse }
  }

  async signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<
    | { kind: "ok"; data: AuthResponse }
    | { kind: GeneralApiProblem["kind"]; data: ApiErrorResponse | undefined }
  > {
    const response = await this.apisauce.post<AuthResponse, ApiErrorResponse>(
      "/api/v1/registrations",
      { user: { name, email_address: email, password, password_confirmation: password } },
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      return { kind: problem?.kind ?? "unknown", data: response.data as ApiErrorResponse }
    }
    return { kind: "ok", data: (response.data as any).data as AuthResponse }
  }

  async getClubs(): Promise<
    { kind: "ok"; data: ClubsResponse } | { kind: string; data: undefined }
  > {
    const response = await this.apisauce.get<ClubsResponse>("/api/v1/clubs")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      return { kind: problem?.kind ?? "unknown", data: undefined }
    }
    return { kind: "ok", data: response.data as ClubsResponse }
  }

  async getClub(
    id: number,
  ): Promise<{ kind: "ok"; data: ClubDetail } | { kind: string; data: undefined }> {
    const response = await this.apisauce.get<{ data: ClubDetail }>(`/api/v1/clubs/${id}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      return { kind: problem?.kind ?? "unknown", data: undefined }
    }
    return { kind: "ok", data: (response.data as any).data as ClubDetail }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
