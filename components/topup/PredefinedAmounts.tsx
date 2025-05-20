import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { topUpStyles } from '../../styles/topupStyles'

interface PredefinedAmountsProps {
  predefinedAmounts: Array<{ label: string; value: number }>
  selectedAmount: number
  onAmountSelection: (value: number) => void
}

const PredefinedAmounts: React.FC<PredefinedAmountsProps> = ({
  predefinedAmounts,
  selectedAmount,
  onAmountSelection,
}) => {
  return (
    <View style={topUpStyles.predefinedAmountsContainer}>
      <View style={topUpStyles.amountButtonsRow}>
        {predefinedAmounts.slice(0, 3).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              topUpStyles.amountButton,
              selectedAmount === item.value && topUpStyles.selectedAmountButton,
            ]}
            onPress={() => onAmountSelection(item.value)}
          >
            <Text style={topUpStyles.amountButtonText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={topUpStyles.amountButtonsRow}>
        {predefinedAmounts.slice(3, 6).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              topUpStyles.amountButton,
              selectedAmount === item.value && topUpStyles.selectedAmountButton,
            ]}
            onPress={() => onAmountSelection(item.value)}
          >
            <Text style={topUpStyles.amountButtonText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default PredefinedAmounts
