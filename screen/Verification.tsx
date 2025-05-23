import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import { getVerificationDynamicStyles } from "@/styles/verificationDynamicStyles";
import { handleTransactionComplete } from "@/utils/navigation";
import { responsive } from "@/utils/responsive";
import SuccessIcon from "../components/verification/SuccessIcon";
import TransactionDetails from "../components/verification/TransactionDetails";
import { useDimensions } from "../hooks/useDimensions";
import { styles } from "../styles/verificationStyles";

const Verification: React.FC = () => {
  const { dimensions, isSmallScreen, isWeb, isPortrait } = useDimensions();

  // Get amount from route params yang di-pass dari TopUpScreen
  const { amount } = useLocalSearchParams<{ amount?: string }>();

  // Default amount jika tidak ada atau debugging
  const transactionAmount = amount || "0";

  // Debug log untuk memastikan amount diterima
  useEffect(() => {
    console.log("Verification screen received amount:", amount);
    console.log("Transaction amount being used:", transactionAmount);
  }, [amount, transactionAmount]);

  const dynamicStyles = getVerificationDynamicStyles();

  const webMaxWidth = responsive.width(isSmallScreen ? 90 : 80);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />

      <View style={styles.centeredContainer}>
        <View
          style={[
            styles.contentWrapper,
            isWeb && {
              maxWidth: Math.min(480, webMaxWidth),
              width: "100%",
            },
          ]}
        >
          <View style={[styles.successCard, dynamicStyles.successCard]}>
            {/* Success Icon - Responsive size */}
            <SuccessIcon
              iconSize={dynamicStyles.iconSize}
              successIconStyle={[styles.successIcon, dynamicStyles.successIcon]}
            />

            {/* Transaction Details - Pass amount dari TopUpScreen */}
            <TransactionDetails
              dynamicStyles={dynamicStyles}
              amount={transactionAmount}
            />
          </View>
        </View>
      </View>

      {/* Fixed button at the bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.completeButton,
            dynamicStyles.buttonPadding,
            isWeb && ({ cursor: "pointer" } as any),
          ]}
          onPress={handleTransactionComplete}
        >
          <Text style={[styles.completeButtonText, dynamicStyles.buttonText]}>
            TRANSAKSI SELESAI
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Verification;
