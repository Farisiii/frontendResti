import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { topUpStyles } from '../../styles/topupStyles'

interface NumpadProps {
  onNumberPress: (num: number) => void
  onDeletePress: () => void
  onComplete: () => void
}

const Numpad: React.FC<NumpadProps> = ({
  onNumberPress,
  onDeletePress,
  onComplete,
}) => {
  return (
    <View style={topUpStyles.numpadContainer}>
      <View style={topUpStyles.numpadRow}>
        {[1, 2, 3].map((num) => (
          <TouchableOpacity
            key={num}
            style={topUpStyles.numButton}
            onPress={() => onNumberPress(num)}
          >
            <Text style={topUpStyles.numButtonText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={topUpStyles.numpadRow}>
        {[4, 5, 6].map((num) => (
          <TouchableOpacity
            key={num}
            style={topUpStyles.numButton}
            onPress={() => onNumberPress(num)}
          >
            <Text style={topUpStyles.numButtonText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={topUpStyles.numpadRow}>
        {[7, 8, 9].map((num) => (
          <TouchableOpacity
            key={num}
            style={topUpStyles.numButton}
            onPress={() => onNumberPress(num)}
          >
            <Text style={topUpStyles.numButtonText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={topUpStyles.numpadRow}>
        {/* Delete button */}
        <TouchableOpacity
          style={[topUpStyles.actionButton, topUpStyles.deleteButton]}
          onPress={onDeletePress}
        >
          <Text style={topUpStyles.actionButtonText}>DEL</Text>
        </TouchableOpacity>

        {/* Zero button */}
        <TouchableOpacity
          style={topUpStyles.numButton}
          onPress={() => onNumberPress(0)}
        >
          <Text style={topUpStyles.numButtonText}>0</Text>
        </TouchableOpacity>

        {/* Complete button */}
        <TouchableOpacity
          style={[topUpStyles.actionButton, topUpStyles.completeButton]}
          onPress={() => {
            onComplete()
          }}
        >
          <Text style={topUpStyles.actionButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Numpad
