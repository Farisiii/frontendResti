import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { topUpStyles } from "../../styles/topupStyles";

interface PredefinedAmountsProps {
  predefinedAmounts: Array<{ label: string; value: number }>;
  selectedAmount: number;
  onAmountSelection: (value: number) => void;
}

const PredefinedAmounts: React.FC<PredefinedAmountsProps> = ({
  predefinedAmounts,
  selectedAmount,
  onAmountSelection,
}) => {
  return (
    <View style={topUpStyles.optionsContainer}>
      <View style={topUpStyles.optionsGrid}>
        {predefinedAmounts.map((amount) => (
          <TouchableOpacity
            key={amount.value}
            style={[
              topUpStyles.optionButton,
              selectedAmount === amount.value && topUpStyles.selectedOption,
            ]}
            onPress={() => onAmountSelection(amount.value)}
          >
            <Text
              style={[
                topUpStyles.optionText,
                selectedAmount === amount.value &&
                  topUpStyles.selectedOptionText,
              ]}
            >
              {amount.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PredefinedAmounts;
