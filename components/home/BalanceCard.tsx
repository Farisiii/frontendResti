import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { smartParkStyles } from '../../styles/smartParkStyles'

type BalanceCardProps = {
  userName: string
  balance: string
  hideBalance: boolean
  onToggleVisibility: () => void
}

/**
 * Balance Card component for displaying user name and balance
 */
const BalanceCard: React.FC<BalanceCardProps> = ({
  userName,
  balance,
  hideBalance,
  onToggleVisibility,
}) => {
  return (
    <View style={smartParkStyles.balanceContainer}>
      <Text style={smartParkStyles.balanceLabel}>
        Ini Saldo Dompet Kamu, {userName}
      </Text>
      <View style={smartParkStyles.balanceRow}>
        <Text style={smartParkStyles.balanceAmount}>
          {hideBalance ? 'Rp XXX.XXX.XXX' : balance}
        </Text>
        <TouchableOpacity onPress={onToggleVisibility}>
          <Ionicons
            name={hideBalance ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#777"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BalanceCard
