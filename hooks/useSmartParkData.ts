import { useEffect, useState } from 'react'
import { fetchActivityLog, fetchUserData } from '../api/smartParkService'
import { ActivityLogItem } from '../types/smartPark'
import { formatCurrency } from '../utils/formatting'

export const useSmartParkData = () => {
  const [userName, setUserName] = useState<string>('')
  const [balance, setBalance] = useState<string>('')
  const [rawBalance, setRawBalance] = useState<number>(0)
  const [hideBalance, setHideBalance] = useState<boolean>(false)
  const [activityLog, setActivityLog] = useState<ActivityLogItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const toggleBalanceVisibility = () => {
    setHideBalance(!hideBalance)
  }

  const loadData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [userData, activityData] = await Promise.all([
        fetchUserData(),
        fetchActivityLog(),
      ])

      setUserName(userData.name)
      setRawBalance(userData.balance)
      setBalance(formatCurrency(userData.balance))
      setActivityLog(activityData.logs)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Gagal memuat data. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return {
    userName,
    balance,
    rawBalance,
    hideBalance,
    activityLog,
    isLoading,
    error,

    toggleBalanceVisibility,
    refreshData: loadData,
  }
}
