import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { router } from "expo-router";
import Header from "../components/Header";
import AmountDisplay from "../components/topup/AmountDisplay";
import ErrorModal from "../components/topup/ErrorModal";
import Numpad from "../components/topup/Numpad";
import PredefinedAmounts from "../components/topup/PredefinedAmounts";
import LoadingModal from "../components/topup/LoadingModal";
import { useDimensions } from "../hooks/useDimensions";
import { formatCurrency, isValidAmount } from "../utils/currency";
import { responsive } from "../utils/responsive";
import { topUpBalance } from "../api/smartParkService";
import { topUpStyles } from "../styles/topupStyles";
import { handleComplete } from "../utils/navigation"; // Import navigation helper

const TopUpScreen: React.FC = () => {
  const { isSmallScreen, isWeb } = useDimensions();

  // State management
  const [actualAmount, setActualAmount] = useState<number>(0);
  const [displayAmount, setDisplayAmount] = useState<string>("0,00");
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const updateAmount = (newAmount: number) => {
    setActualAmount(newAmount);
    setDisplayAmount(formatCurrency(newAmount));
  };

  const handleAmountSelection = (value: number) => {
    updateAmount(value);
  };

  const handleNumberPress = (num: number) => {
    let newAmount = actualAmount * 10 + num;

    // Prevent overflow (max 10 billion)
    if (newAmount >= 10000000000) {
      return;
    }

    updateAmount(newAmount);
  };

  const handleDeletePress = () => {
    const newAmount = Math.floor(actualAmount / 10);
    updateAmount(newAmount);
  };

  const handleBackPress = () => {
    if (isWeb) {
      window.history.back();
    } else {
      router.back();
    }
  };

  const processTopUp = async () => {
    // Validate amount first
    if (!isValidAmount(actualAmount) || actualAmount < 10000) {
      setIsErrorModalVisible(true);
      return;
    }

    setIsLoadingModalVisible(true);

    try {
      console.log(`Attempting to top up ${actualAmount}`);

      // Create a timeout promise to handle long requests
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(
            new Error("Request timeout - Server took too long to respond")
          );
        }, 15000); // 15 seconds timeout
      });

      // Race between the API call and timeout
      const response = await Promise.race([
        topUpBalance(actualAmount),
        timeoutPromise,
      ]);

      // Manual type-check/casting
      if (
        typeof response === "object" &&
        response !== null &&
        "success" in response
      ) {
        const topUpResponse = response as {
          success: boolean;
          newBalance: number;
        };

        if (topUpResponse.success) {
          // Convert actualAmount to string for navigation
          const amountString = actualAmount.toString();

          // Navigate to verification page with amount
          handleComplete(amountString);
        }
      } else {
        // Handle unexpected response format
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Top up error:", error);
      Alert.alert(
        "Top Up Gagal",
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat melakukan top up. Silakan coba lagi.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoadingModalVisible(false);
    }
  };

  const closeErrorModal = () => {
    setIsErrorModalVisible(false);
  };

  const predefinedAmounts = [
    { label: "Rp10.000,00", value: 10000 },
    { label: "Rp20.000,00", value: 20000 },
    { label: "Rp30.000,00", value: 30000 },
    { label: "Rp40.000,00", value: 40000 },
    { label: "Rp50.000,00", value: 50000 },
    { label: "Rp100.000,00", value: 100000 },
  ];

  return (
    <>
      <SafeAreaView style={topUpStyles.safeArea}>
        <StatusBar backgroundColor='#E62132' barStyle='light-content' />
        <View style={topUpStyles.headerContainer}>
          <Header title='Nominal Top Up' onBackPress={handleBackPress} />
        </View>

        <View
          style={[
            topUpStyles.content,
            responsive.isLandscape() && topUpStyles.contentLandscape,
          ]}
        >
          <AmountDisplay amount={displayAmount} />

          <PredefinedAmounts
            predefinedAmounts={predefinedAmounts}
            selectedAmount={actualAmount}
            onAmountSelection={handleAmountSelection}
          />

          <Numpad
            onNumberPress={handleNumberPress}
            onDeletePress={handleDeletePress}
            onComplete={processTopUp}
          />
        </View>
      </SafeAreaView>

      <ErrorModal visible={isErrorModalVisible} onClose={closeErrorModal} />
      <LoadingModal visible={isLoadingModalVisible} />
    </>
  );
};

export default TopUpScreen;
