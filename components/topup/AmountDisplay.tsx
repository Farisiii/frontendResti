import React from 'react'
import { Text, View } from 'react-native'
import { topUpStyles } from '../../styles/topupStyles'

interface AmountDisplayProps {
  amount: string
}

const AmountDisplay: React.FC<AmountDisplayProps> = ({ amount }) => {
  return (
    <View style={topUpStyles.amountContainer}>
      <Text style={topUpStyles.amountPrefix}>
        Rp <Text style={topUpStyles.amountText}>{amount}</Text>
      </Text>

      <Text style={topUpStyles.minimalText}>Minimal Top Up Rp10.000 yaa</Text>
    </View>
  )
}

export default AmountDisplay
