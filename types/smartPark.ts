export type ActivityLogItem = {
  id: number
  type: 'masuk' | 'keluar'
  time: string
}

export type SmartParkScreenProps = {
  navigation?: any
}

// API response types
export type UserData = {
  name: string
  balance: number
}

export type ActivityLogData = {
  logs: ActivityLogItem[]
}
