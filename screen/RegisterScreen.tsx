import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import InputField from "@/components/auth/InputField";
import LogoHeader from "@/components/auth/LogoHeader";
import { authStyles } from "@/styles/authStyles";
import { registerUser } from "@/api/smartParkService";
import type { RegistrationData } from "@/types/smartPark";

export default function RegisterScreen() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const validateRegistration = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Semua field harus diisi");
      return false;
    }

    if (username.length < 3) {
      Alert.alert("Error", "Username minimal 3 karakter");
      return false;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      Alert.alert(
        "Error",
        "Username hanya boleh mengandung huruf, angka, dan underscore"
      );
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Format email tidak valid");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password minimal 6 karakter");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Password tidak cocok");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateRegistration()) {
      return;
    }

    setIsLoading(true);

    try {
      const registrationData: RegistrationData = {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        // Optional: bisa tambahkan vehicles jika diperlukan
        vehicles: [],
      };

      console.log("Attempting registration with:", {
        username: registrationData.username,
        email: registrationData.email,
        // Don't log password for security
      });

      const result = await registerUser(registrationData);

      console.log("Register result:", result); // <-- Tambahkan log ini

      if (!result.success) {
        Alert.alert(
          "Gagal Mendaftar",
          result.error || "Terjadi kesalahan saat mendaftar. Silakan coba lagi."
        );
        return; // ⛔ Tambahkan ini untuk mencegah screen berubah
      }

      if (result.success) {
        Alert.alert("Berhasil!", "Akun berhasil dibuat. Silakan login.");

        // Navigasi langsung tanpa menunggu pengguna menekan OK
        router.push("/login");
      } else {
        Alert.alert(
          "Gagal Mendaftar",
          result.error || "Terjadi kesalahan saat mendaftar. Silakan coba lagi."
        );
      }
    } catch (error: any) {
      console.error("Registration error:", error);

      // Handle specific error messages
      let errorMessage = "Terjadi kesalahan jaringan. Silakan coba lagi.";

      if (error.message) {
        if (
          error.message.includes("already exists") ||
          error.message.includes("sudah terdaftar")
        ) {
          errorMessage =
            "Email atau username sudah terdaftar. Silakan gunakan yang lain.";
        } else if (
          error.message.includes("Network Error") ||
          error.message.includes("timeout")
        ) {
          errorMessage =
            "Koneksi bermasalah. Periksa internet Anda dan coba lagi.";
        } else if (error.message.includes("validation")) {
          errorMessage =
            "Data yang dimasukkan tidak valid. Periksa kembali formulir Anda.";
        } else {
          errorMessage = error.message;
        }
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle='light-content' backgroundColor='#E53E3E' />
      <ScrollView
        contentContainerStyle={authStyles.scrollContainer}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        <LogoHeader />

        <View style={authStyles.formContainer}>
          <InputField
            label='Username'
            placeholder='Masukkan username Anda'
            value={username}
            onChangeText={setUsername}
            iconName='person-outline'
            autoCapitalize='none'
          />

          <InputField
            label='Email'
            placeholder='Masukkan email Anda'
            value={email}
            onChangeText={setEmail}
            iconName='mail-outline'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <InputField
            label='Password'
            placeholder='Masukkan password Anda'
            value={password}
            onChangeText={setPassword}
            iconName='lock-closed-outline'
            secureTextEntry={!showPassword}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
          />

          <InputField
            label='Konfirmasi Password'
            placeholder='Masukkan ulang password Anda'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            iconName='lock-closed-outline'
            secureTextEntry={!showConfirmPassword}
            showPassword={showConfirmPassword}
            toggleShowPassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />

          <TouchableOpacity
            style={[
              authStyles.loginButton,
              isLoading && authStyles.loginButtonDisabled,
            ]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={authStyles.loginButtonText}>
              {isLoading ? "Mendaftar..." : "DAFTAR"}
            </Text>
          </TouchableOpacity>

          <View style={authStyles.dividerContainer}>
            <View style={authStyles.dividerLine} />
            <Text style={authStyles.dividerText}>ATAU</Text>
            <View style={authStyles.dividerLine} />
          </View>

          <View style={authStyles.signUpContainer}>
            <Text style={authStyles.signUpText}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={handleBackToLogin}>
              <Text style={authStyles.signUpLink}>Masuk Sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
