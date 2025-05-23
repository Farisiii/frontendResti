// services/apiService.ts
import AsyncStorage from '@react-native-async-storage/async-storage'

// Configuration
const API_BASE_URL = 'https://smartpark-backend.vercel.app/api' // Ganti dengan URL server Anda
// Contoh: const API_BASE_URL = 'http://192.168.1.100:3000/api'

export type User = {
  userID: string
  username: string
  email: string
  role: 'user' | 'admin'
  vehicles: Array<{
    plate: string
    description: string
  }>
  rfid?: string
}

export type ApiResponse<T = any> = {
  status: 'success' | 'error'
  data?: T
  message?: string
  error?: string
}

export type LoginResponse = ApiResponse<{
  user: User
  token: string
}>

export type RegisterResponse = ApiResponse<User>

export type ProfileResponse = ApiResponse<{
  user: User
  wallet?: {
    walletID: string
    userID: string
    balance: number
    createdAt: string
    updatedAt: string
  }
}>

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('userToken')
    } catch (error) {
      console.error('Error getting auth token:', error)
      return null
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Add auth token if available
    const token = await this.getAuthToken()
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    console.log(`Making ${config.method || 'GET'} request to:`, url)

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        )
      }

      return data
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error)
      throw error
    }
  }

  // Authentication methods
  async register(userData: {
    username: string
    email: string
    password: string
    vehicles?: Array<{ plate: string; description: string }>
    role?: 'user' | 'admin'
  }): Promise<RegisterResponse> {
    return this.makeRequest<RegisterResponse>('/users/register', {
      method: 'POST',
      body: JSON.stringify({
        ...userData,
        vehicles: userData.vehicles || [],
        role: userData.role || 'user',
      }),
    })
  }

  async login(credentials: {
    email: string
    password: string
  }): Promise<LoginResponse> {
    return this.makeRequest<LoginResponse>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async getProfile(): Promise<ProfileResponse> {
    return this.makeRequest<ProfileResponse>('/users/profile')
  }

  async updateProfile(userData: {
    username?: string
    email?: string
    password?: string
    vehicles?: Array<{ plate: string; description: string }>
  }): Promise<ApiResponse<User>> {
    return this.makeRequest<ApiResponse<User>>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  }

  // Vehicle management methods
  async addVehicle(vehicleData: {
    plate: string
    description?: string
  }): Promise<ApiResponse<User>> {
    return this.makeRequest<ApiResponse<User>>('/users/vehicle', {
      method: 'POST',
      body: JSON.stringify({
        plate: vehicleData.plate,
        description: vehicleData.description || '',
      }),
    })
  }

  async updateVehicleDescription(vehicleData: {
    plate: string
    description: string
  }): Promise<ApiResponse<User>> {
    return this.makeRequest<ApiResponse<User>>('/users/vehicle', {
      method: 'PUT',
      body: JSON.stringify(vehicleData),
    })
  }

  async removeVehicle(plate: string): Promise<ApiResponse<User>> {
    return this.makeRequest<ApiResponse<User>>(
      `/users/vehicle/${encodeURIComponent(plate)}`,
      {
        method: 'DELETE',
      }
    )
  }

  // Admin methods
  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return this.makeRequest<ApiResponse<User[]>>('/users/all')
  }

  async addRfid(userData: {
    userID: string
    rfid: string
  }): Promise<ApiResponse<User>> {
    return this.makeRequest<ApiResponse<User>>('/users/admin/rfid', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async removeRfid(userID: string): Promise<ApiResponse<User>> {
    return this.makeRequest<ApiResponse<User>>(`/users/admin/rfid/${userID}`, {
      method: 'DELETE',
    })
  }

  // Helper methods
  async saveAuthData(user: User, token: string): Promise<void> {
    try {
      await AsyncStorage.setItem('userToken', token)
      await AsyncStorage.setItem('userData', JSON.stringify(user))
    } catch (error) {
      console.error('Error saving auth data:', error)
      throw error
    }
  }

  async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.removeItem('userToken')
      await AsyncStorage.removeItem('userData')
    } catch (error) {
      console.error('Error clearing auth data:', error)
      throw error
    }
  }

  async getStoredUserData(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem('userData')
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error('Error getting stored user data:', error)
      return null
    }
  }
}

// Export singleton instance
export const apiService = new ApiService()
export default apiService
