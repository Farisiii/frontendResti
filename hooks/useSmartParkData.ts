import { fetchActivityLog, fetchUserData } from '@/api/smartParkService'
import { usePathname } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityLogItem } from '../types/smartPark'
import { formatCurrency } from '../utils/formatting'

export interface SmartParkData {
  userName: string
  balance: string
  rawBalance: number
  hideBalance: boolean
  activityLog: ActivityLogItem[]
  isLoading: boolean
  error: string | null
  refreshing: boolean
  lastRefreshTime: Date | null
  toggleBalanceVisibility: () => void
  refreshData: () => Promise<void>
  refreshActivityLog: () => Promise<void>
  setAutoRefresh: (enabled: boolean) => void
  autoRefreshEnabled: boolean
}

export const useSmartParkData = (): SmartParkData => {
  const pathname = usePathname()
  const [userName, setUserName] = useState<string>('')
  const [rawBalance, setRawBalance] = useState<number>(0)
  const [balance, setBalance] = useState<string>('')
  const [hideBalance, setHideBalance] = useState<boolean>(false)
  const [activityLog, setActivityLog] = useState<ActivityLogItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null)
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState<boolean>(true)

  const refreshTimeoutRef = useRef<number | null>(null)
  const previousActivityCountRef = useRef<number>(0)
  const activityRefreshInterval = useRef<number | null>(null)
  const fullRefreshInterval = useRef<number | null>(null)

  // Function untuk check apakah sedang di halaman smart-park
  const isOnSmartParkPage = useCallback(() => {
    return pathname === '/smart-park' || pathname?.includes('/smart-park')
  }, [pathname])

  // Function untuk clear semua interval
  const clearAllIntervals = useCallback(() => {
    if (activityRefreshInterval.current) {
      clearInterval(activityRefreshInterval.current)
      activityRefreshInterval.current = null
    }
    if (fullRefreshInterval.current) {
      clearInterval(fullRefreshInterval.current)
      fullRefreshInterval.current = null
    }
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current)
      refreshTimeoutRef.current = null
    }
  }, [])

  // Function untuk fetch user data
  const loadUserData = useCallback(async () => {
    if (!isOnSmartParkPage()) {
      return
    }

    try {
      const userData = await fetchUserData()
      setUserName(userData.name)
      setRawBalance(userData.balance)
      setBalance(formatCurrency(userData.balance))
      setError(null)
    } catch (err) {
      console.error('Error loading user data:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Gagal memuat data user. Silakan coba lagi.'
      )
    }
  }, [isOnSmartParkPage])

  // Function untuk fetch activity log dengan comparison
  const loadActivityLog = useCallback(async () => {
    if (!isOnSmartParkPage()) {
      return []
    }

    try {
      const activityData = await fetchActivityLog()
      const newLogs = activityData.logs || []

      // Check jika ada data baru
      const hasNewData =
        newLogs.length !== previousActivityCountRef.current ||
        JSON.stringify(newLogs) !== JSON.stringify(activityLog)

      if (hasNewData) {
        console.log(
          `Activity log updated: ${newLogs.length} entries (was ${previousActivityCountRef.current})`
        )
        setActivityLog(newLogs)
        previousActivityCountRef.current = newLogs.length
        setLastRefreshTime(new Date())
      }

      setError(null)
      return newLogs
    } catch (err) {
      console.error('Error loading activity log:', err)
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Gagal memuat log aktivitas. Silakan coba lagi.'
      setError(errorMessage)
      return []
    }
  }, [activityLog, isOnSmartParkPage])

  // Function untuk refresh semua data
  const refreshData = useCallback(async () => {
    if (!isOnSmartParkPage()) {
      return
    }

    console.log('Refreshing all smart park data...')
    setRefreshing(true)
    setError(null)

    try {
      await Promise.all([loadUserData(), loadActivityLog()])
    } catch (err) {
      console.error('Error refreshing data:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Gagal memuat data. Silakan coba lagi.'
      )
    } finally {
      setRefreshing(false)
      setIsLoading(false)
    }
  }, [loadUserData, loadActivityLog, isOnSmartParkPage])

  // Function untuk refresh hanya activity log
  const refreshActivityLog = useCallback(async () => {
    if (!isOnSmartParkPage()) {
      return
    }

    console.log('Refreshing activity log only...')
    setRefreshing(true)

    try {
      await loadActivityLog()
    } catch (err) {
      console.error('Error refreshing activity log:', err)
    } finally {
      setRefreshing(false)
    }
  }, [loadActivityLog, isOnSmartParkPage])

  // Toggle balance visibility
  const toggleBalanceVisibility = useCallback(() => {
    setHideBalance((prev) => !prev)
  }, [])

  // Set auto refresh
  const setAutoRefresh = useCallback((enabled: boolean) => {
    setAutoRefreshEnabled(enabled)
    console.log(`Auto-refresh ${enabled ? 'enabled' : 'disabled'}`)
  }, [])

  // Effect untuk monitor perubahan route dan clear interval/data saat bukan di smart-park
  useEffect(() => {
    if (!isOnSmartParkPage()) {
      console.log(
        'Not on smart-park page - clearing intervals and resetting state'
      )
      clearAllIntervals()

      // Reset state when leaving smart-park page
      setIsLoading(false)
      setRefreshing(false)
      setError(null)
      // Optional: Keep user data but clear activity log
      // setActivityLog([])
    }
  }, [pathname, isOnSmartParkPage, clearAllIntervals])

  // Initial data load - hanya ketika di smart-park page
  useEffect(() => {
    if (isOnSmartParkPage()) {
      console.log('SmartPark hook initializing for smart-park page...')
      setIsLoading(true)
      refreshData()
    }
  }, [isOnSmartParkPage]) // Depend on isOnSmartParkPage to trigger when entering smart-park

  // Auto-refresh effect - hanya ketika di smart-park page
  useEffect(() => {
    // Clear existing intervals first
    clearAllIntervals()

    if (autoRefreshEnabled && !isLoading && isOnSmartParkPage()) {
      console.log('Setting up auto-refresh intervals for smart-park page...')

      // Set up periodic refresh untuk activity log (lebih sering)
      activityRefreshInterval.current = setInterval(() => {
        if (isOnSmartParkPage()) {
          console.log('Auto-refreshing activity log...')
          refreshActivityLog()
        }
      }, 30000) // Setiap 30 detik

      // Set up periodic refresh untuk semua data (lebih jarang)
      fullRefreshInterval.current = setInterval(() => {
        if (isOnSmartParkPage()) {
          console.log('Auto-refreshing all data...')
          refreshData()
        }
      }, 120000) // Setiap 2 menit

      console.log('Auto-refresh intervals set up successfully')
    } else {
      console.log(
        'Auto-refresh disabled or not on smart-park page - no intervals set'
      )
    }

    return () => {
      clearAllIntervals()
    }
  }, [
    autoRefreshEnabled,
    isLoading,
    refreshActivityLog,
    refreshData,
    isOnSmartParkPage,
    clearAllIntervals,
  ])

  // Cleanup intervals when component unmounts
  useEffect(() => {
    return () => {
      clearAllIntervals()
    }
  }, [clearAllIntervals])

  // Debug logging untuk perubahan state (hanya untuk smart-park page)
  useEffect(() => {
    if (isOnSmartParkPage()) {
      console.log(`Smart park data state updated:`, {
        userName,
        rawBalance,
        balance,
        activityLogCount: activityLog.length,
        isLoading,
        refreshing,
        error: error ? 'Error present' : 'No error',
        lastRefreshTime: lastRefreshTime?.toLocaleTimeString(),
        autoRefreshEnabled,
        currentPath: pathname || 'unknown',
        isOnSmartParkPage: isOnSmartParkPage(),
      })
    }
  }, [
    userName,
    rawBalance,
    balance,
    activityLog.length,
    isLoading,
    refreshing,
    error,
    lastRefreshTime,
    autoRefreshEnabled,
    pathname,
    isOnSmartParkPage,
  ])

  return {
    userName,
    balance,
    rawBalance,
    hideBalance,
    activityLog,
    isLoading,
    error,
    refreshing,
    lastRefreshTime,
    toggleBalanceVisibility,
    refreshData,
    refreshActivityLog,
    setAutoRefresh,
    autoRefreshEnabled,
  }
}
