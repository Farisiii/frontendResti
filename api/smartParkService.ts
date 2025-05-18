import { ActivityLogData, UserData } from '../types/smartPark'

// API calls for Smart Park feature
// Replace with actual API implementation
export const fetchUserData = async (): Promise<UserData> => {
  try {
    // In a real application, this would be a fetch call to your backend
    // For example:
    // const response = await fetch('https://your-api.com/user-data', {
    //   headers: { 'Authorization': `Bearer ${getToken()}` }
    // });
    // if (!response.ok) throw new Error('Failed to fetch user data');
    // return await response.json();

    // Mock API call for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Dompet Kamu, Bihurin',
          balance: 1250000,
        })
      }, 1000)
    })
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

export const fetchActivityLog = async (): Promise<ActivityLogData> => {
  try {
    // In a real application, this would be a fetch call to your backend
    // Mock API call for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          logs: [
            { id: 1, type: 'masuk', time: '09.30' },
            { id: 2, type: 'keluar', time: '10.30' },
            { id: 3, type: 'masuk', time: '22.30' },
            { id: 4, type: 'masuk', time: '00.30' },
            { id: 5, type: 'keluar', time: '00.30' },
            { id: 6, type: 'keluar', time: '00.30' },
            { id: 7, type: 'masuk', time: '09.30' },
            { id: 8, type: 'keluar', time: '10.30' },
            { id: 9, type: 'masuk', time: '22.30' },
            { id: 10, type: 'masuk', time: '00.30' },
            { id: 11, type: 'keluar', time: '00.30' },
            { id: 12, type: 'keluar', time: '00.30' },
          ],
        })
      }, 1200)
    })
  } catch (error) {
    console.error('Error fetching activity log:', error)
    throw error
  }
}

// Additional API functions
export const topUpBalance = async (
  amount: number
): Promise<{ success: boolean; newBalance: number }> => {
  try {
    // Mock API call for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          newBalance: 1250000 + amount,
        })
      }, 1000)
    })
  } catch (error) {
    console.error('Error processing top up:', error)
    throw error
  }
}

export const checkVehicleStatus = async (): Promise<{
  isParked: boolean
  location?: string
  entryTime?: string
}> => {
  try {
    // Mock API call for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          isParked: true,
          location: 'Lantai 2, Blok A5',
          entryTime: '09.30',
        })
      }, 1000)
    })
  } catch (error) {
    console.error('Error checking vehicle status:', error)
    throw error
  }
}
