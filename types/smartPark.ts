export type ActivityLogItem = {
  id: number
  type: 'masuk' | 'keluar'
  time: string
}

export type SmartParkScreenProps = {
  navigation?: any
}

// export type UserData = {
//   name: string
//   balance: number
// }

export type ActivityLogData = {
  logs: ActivityLogItem[]
}

// types/smartPark.ts (Complete Version)

// ===== UI/Frontend Interfaces =====

// Interface untuk User Data yang digunakan di UI
export interface UserData {
  name: string
  balance: number
  // Additional fields from backend
  email?: string
  vehicles?: Vehicle[]
  rfid?: string
  userID?: string
  role?: 'user' | 'admin'
  created_at?: string
  updated_at?: string
}

// Interface untuk Vehicle
export interface Vehicle {
  plate: string
  description: string
}

// Interface untuk Activity Log Data
// export interface ActivityLogData {
//   logs: ActivityLog[];
// }

// Interface untuk Activity Log
export interface ActivityLog {
  id: number
  type: 'masuk' | 'keluar'
  time: string
  // Additional fields
  vehicle_plate?: string
  billing?: number
  status?: 'paid' | 'pending'
}

// Interface untuk Parking Status
export interface ParkingStatus {
  isParked: boolean
  location?: string
  entryTime?: string
  vehicle_plate?: string
  parkID?: string
}

// ===== Backend API Interfaces =====

// Interface untuk API Response dari backend
export interface ApiResponse<T = any> {
  status: 'success' | 'error'
  data?: T
  message?: string
  error?: string
}

// Interface untuk User dari backend
export interface BackendUser {
  userID: string
  username: string
  email: string
  vehicles: Vehicle[]
  role: 'user' | 'admin'
  rfid?: string
}

// Interface untuk Wallet dari backend
export interface BackendWallet {
  walletID: string
  userID: string
  current_balance: number
  created_at: string
  updated_at: string
}

// Interface untuk Profile Response
export interface ProfileResponse {
  user: BackendUser
  wallet: BackendWallet
}

// Interface untuk Login Response
export interface LoginResponse {
  user: BackendUser
  token: string
}

// Interface untuk Parking Session dari backend
export interface ParkingSession {
  parkID: string
  userID: string
  vehicle_plate: string
  in_date: string
  out_date: string | null
  payment_status: 'pending' | 'paid'
  total_billing: number
  vehicle_description?: string
  user_name?: string
  user_email?: string
}

// ===== Request/Response Interfaces =====

// Interface untuk Login Credentials
export interface LoginCredentials {
  email: string
  password: string
}

// Interface untuk Registration Data
export interface RegistrationData {
  username: string
  email: string
  password: string
  vehicles?: Vehicle[]
}

// Interface untuk Top Up Response
export interface TopUpResponse {
  success: boolean
  newBalance: number
}

// Interface untuk Vehicle Management Response
export interface VehicleManagementResponse {
  success: boolean
  data?: BackendUser
  error?: string
}

// Interface untuk Parking Action Response
export interface ParkingActionResponse {
  success: boolean
  data?: ParkingSession
  error?: string
}

// Interface untuk Auth Response
export interface AuthResponse {
  success: boolean
  user?: BackendUser
  token?: string
  error?: string
}

// Interface untuk Check-in/Check-out Request
export interface ParkingRequest {
  rfid: string
  vehicle_plate: string
}

// Interface untuk Vehicle Add/Update Request
export interface VehicleRequest {
  plate: string
  description?: string
}

// Interface untuk Top-up Request
export interface TopUpRequest {
  amount: number
}

// Interface untuk Admin RFID Request
export interface AdminRfidRequest {
  userID: string
  rfid: string
}

// Interface untuk Admin Top-up Request
export interface AdminTopUpRequest {
  userID: string
  amount: number
}

// ===== Utility Types =====

// Type untuk status pembayaran
export type PaymentStatus = 'pending' | 'paid'

// Type untuk role user
export type UserRole = 'user' | 'admin'

// Type untuk tipe aktivitas
export type ActivityType = 'masuk' | 'keluar'

// Type untuk response status
export type ResponseStatus = 'success' | 'error'

// ===== Enums =====

// Enum untuk Activity Types
export enum ActivityTypeEnum {
  MASUK = 'masuk',
  KELUAR = 'keluar',
}

// Enum untuk Payment Status
export enum PaymentStatusEnum {
  PENDING = 'pending',
  PAID = 'paid',
}

// Enum untuk User Roles
export enum UserRoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

// Enum untuk API Response Status
export enum ResponseStatusEnum {
  SUCCESS = 'success',
  ERROR = 'error',
}

// ===== Error Types =====

// Interface untuk custom error
export interface SmartParkError {
  code: string
  message: string
  details?: any
}

// Interface untuk validation error
export interface ValidationError {
  field: string
  message: string
}

// ===== Pagination Interface =====

// Interface untuk pagination (untuk admin endpoints)
export interface PaginationParams {
  limit?: number
  page?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  startDate?: string
  endDate?: string
  status?: PaymentStatus | 'all'
}

// Interface untuk pagination response
export interface PaginationInfo {
  total: number
  page: number
  limit: number
  pages: number
}

// Interface untuk paginated response
export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationInfo
}

// ===== Configuration Types =====

// Interface untuk API configuration
export interface ApiConfig {
  baseURL: string
  timeout: number
  retryAttempts?: number
  retryDelay?: number
}

// Interface untuk storage keys
export interface StorageKeys {
  JWT_TOKEN: string
  USER_DATA: string
  LAST_SYNC: string
}

// ===== Constants =====

export const STORAGE_KEYS: StorageKeys = {
  JWT_TOKEN: 'jwt_token',
  USER_DATA: 'user_data',
  LAST_SYNC: 'last_sync',
}

export const API_ENDPOINTS = {
  // User endpoints
  REGISTER: '/api/users/register',
  LOGIN: '/api/users/login',
  PROFILE: '/api/users/profile',
  VEHICLE: '/api/users/vehicle',
  ALL_USERS: '/api/users/all',
  ADMIN_RFID: '/api/users/admin/rfid',

  // Parking endpoints
  CHECKIN: '/api/parking/checkin',
  CHECKOUT: '/api/parking/checkout',
  HISTORY: '/api/parking/history',
  ACTIVE: '/api/parking/active',
  ADMIN_ACTIVE: '/api/parking/admin/active',
  ADMIN_HISTORY: '/api/parking/admin/history',
  MIGRATE_VEHICLES: '/api/users/migrate-vehicles',

  // Wallet endpoints
  BALANCE: '/api/wallet/balance',
  TOPUP: '/api/wallet/topup',
  ADMIN_TOPUP: '/api/wallet/admin/topup',
} as const

// Default values
export const DEFAULT_VALUES = {
  API_TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  PAGINATION_LIMIT: 20,
} as const
