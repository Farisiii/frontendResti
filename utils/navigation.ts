// utils/navigation.ts
import { router } from "expo-router";

/**
 * Handle back navigation based on platform
 * @param isWeb Whether the app is running on web
 */
export const handleBackPress = (isWeb: boolean = false): void => {
  console.log("Back button pressed");
  if (isWeb) {
    window.history.back();
  } else {
    router.back();
  }
};

/**
 * Navigate to vehicle check/list page
 */
export const handleCheckVehicle = (): void => {
  console.log("Check vehicle");
  router.push("/platList");
};

/**
 * Navigate to top up balance page
 */
export const handleTopUp = () => {
  console.log("Top up balance");
  router.push("/topUp");
};

/**
 * Navigate back to smart park home
 */
export const handleTransactionComplete = (): void => {
  console.log("Topup Complete complete button pressed");
  router.push("/smart-park");
};

/**
 * Navigate to verification page with amount
 */
export const handleComplete = (amount?: string) => {
  if (amount && amount !== "undefined") {
    router.push({
      pathname: "/verification",
      params: { amount },
    });
  } else {
    return;
  }
};

/**
 * Navigate to registration page
 */
export const handleSignUp = () => {
  router.push("/register");
};

/**
 * Navigate to login page
 */
export const handleLogin = () => {
  router.replace("/login");
};

/**
 * Navigate to home page (tabs)
 */
export const handleHome = () => {
  router.replace("/smart-park");
};

/**
 * Navigate to register page
 */
export const handleRegister = () => {
  router.push("/register");
};

/**
 * Navigation helper for successful operations with optional delay
 */
export const navigateAfterSuccess = (route: string, delay: number = 0) => {
  if (delay > 0) {
    setTimeout(() => {
      router.replace(route as any);
    }, delay);
  } else {
    router.replace(route as any);
  }
};
