import React from "react";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { topUpStyles } from "../../styles/topupStyles";

interface NumpadProps {
  onNumberPress: (num: number) => void;
  onDeletePress: () => void;
  onComplete: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const Numpad: React.FC<NumpadProps> = ({
  onNumberPress,
  onDeletePress,
  onComplete,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <View style={topUpStyles.keypadContainer}>
      <View style={topUpStyles.keypadGrid}>
        {/* First Row */}
        <TouchableOpacity
          style={topUpStyles.keypadButton}
          onPress={() => onNumberPress(1)}
          disabled={disabled}
        >
          <Text style={topUpStyles.keypadButtonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={topUpStyles.keypadButton}
          onPress={() => onNumberPress(2)}
          disabled={disabled}
        >
          <Text style={topUpStyles.keypadButtonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={topUpStyles.keypadButton}
          onPress={() => onNumberPress(3)}
          disabled={disabled}
        >
          <Text style={topUpStyles.keypadButtonText}>3</Text>
        </TouchableOpacity>

        {/* Second Row */}
        <TouchableOpacity
          style={topUpStyles.keypadButton}
          onPress={() => onNumberPress(4)}
          disabled={disabled}
        >
          <Text style={topUpStyles.keypadButtonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={topUpStyles.keypadButton}
          onPress={() => onNumberPress(5)}
          disabled={disabled}
        >
          <Text style={topUpStyles.keypadButtonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={topUpStyles.keypadButton}
          onPress={() => onNumberPress(6)}
          disabled={disabled}
        >
          <Text style={topUpStyles.keypadButtonText}>6</Text>
        </TouchableOpacity>

        {/* Third Row */}
        <TouchableOpacity
          style={topUpStyles.keypadButton}
          onPress={() => onNumberPress(7)}
          disabled={disabled}
        >
          <Text style={topUpStyles.keypadButtonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={topUpStyles.keypadButton}
          onPress={() => onNumberPress(8)}
          disabled={disabled}
        >
          <Text style={topUpStyles.keypadButtonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={topUpStyles.keypadButton}
          onPress={() => onNumberPress(9)}
          disabled={disabled}
        >
          <Text style={topUpStyles.keypadButtonText}>9</Text>
        </TouchableOpacity>

        {/* Fourth Row */}
        <TouchableOpacity
          style={[topUpStyles.keypadButton, topUpStyles.keypadZeroButton]}
          onPress={() => onNumberPress(0)}
          disabled={disabled}
        >
          <Text style={topUpStyles.keypadButtonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={topUpStyles.keypadButton}
          onPress={onDeletePress}
          disabled={disabled}
        >
          <Text style={topUpStyles.keypadButtonText}>⌫</Text>
        </TouchableOpacity>
      </View>

      {/* Complete button */}
      <TouchableOpacity
        style={[
          topUpStyles.confirmButton,
          disabled && topUpStyles.disabledButton,
        ]}
        onPress={onComplete}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color='#FFF' />
        ) : (
          <Text style={topUpStyles.confirmButtonText}>SELESAI</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Numpad;
