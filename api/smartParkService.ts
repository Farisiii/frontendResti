// api/smartParkService.ts (Updated Version)
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  // UI Types
  ActivityLogData,
  API_ENDPOINTS,
  // Backend Types
  ApiResponse,
  // Request/Response Types
  AuthResponse,
  BackendUser,
  BackendWallet,
  DEFAULT_VALUES,
  LoginResponse,
  ParkingActionResponse,
  ParkingSession,
  ProfileResponse,
  // Constants
  STORAGE_KEYS,
  TopUpResponse,
  UserData,
  VehicleManagementResponse,
} from "../types/smartPark";

// Configuration
const BASE_URL = "https://smartpark-backend.vercel.app";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Increase timeout to 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor untuk menambahkan token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor untuk handle error
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, clear storage
      await AsyncStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    }
    return Promise.reject(error);
  }
);

// Helper function untuk handle API responses
const handleApiResponse = <T>(
  apiCall: Promise<AxiosResponse<ApiResponse<T>>>
): Promise<T> => {
  return apiCall
    .then((response) => {
      if (response.data.status === "success") {
        return response.data.data as T;
      } else {
        throw new Error(response.data.error || "API request failed");
      }
    })
    .catch((error) => {
      console.error("API Error:", error);
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error(error.message || "Network error occurred");
    });
};

// // ===== AUTHENTICATION FUNCTIONS =====

// export const loginUser = async (
//   email: string,
//   password: string
// ): Promise<AuthResponse> => {
//   try {
//     const response = await apiClient.post<ApiResponse<LoginResponse>>(
//       API_ENDPOINTS.LOGIN,
//       { email, password }
//     );

//     if (response.data.status === "success" && response.data.data) {
//       await AsyncStorage.setItem(
//         STORAGE_KEYS.JWT_TOKEN,
//         response.data.data.token
//       );
//       await AsyncStorage.setItem(
//         STORAGE_KEYS.USER_DATA,
//         JSON.stringify(response.data.data.user)
//       );

//       return {
//         success: true,
//         user: response.data.data.user,
//         token: response.data.data.token,
//       };
//     } else {
//       return {
//         success: false,
//         error: response.data.error || "Login failed",
//       };
//     }
//   } catch (error: any) {
//     console.error("Login error:", error);
//     return {
//       success: false,
//       error: error.response?.data?.error || error.message || "Network error",
//     };
//   }
// };

// export const registerUser = async (userData: {
//   username: string;
//   email: string;
//   password: string;
//   vehicles?: Array<{ plate: string; description: string }>;
// }): Promise<{ success: boolean; error?: string }> => {
//   try {
//     const response = await apiClient.post<ApiResponse<BackendUser>>(
//       API_ENDPOINTS.REGISTER,
//       userData
//     );

//     if (response.data.status === "success") {
//       return { success: true };
//     } else {
//       return {
//         success: false,
//         error: response.data.error || "Registration failed",
//       };
//     }
//   } catch (error: any) {
//     console.error("Registration error:", error);
//     return {
//       success: false,
//       error: error.response?.data?.error || error.message || "Network error",
//     };
//   }
// };

// ===== USER DATA FUNCTIONS =====

export const fetchUserData = async (): Promise<UserData> => {
  try {
    const profileResponse = await handleApiResponse<ProfileResponse>(
      apiClient.get<ApiResponse<ProfileResponse>>(API_ENDPOINTS.PROFILE)
    );

    return {
      name: profileResponse.user.username,
      balance: profileResponse.wallet.current_balance,
      email: profileResponse.user.email,
      vehicles: profileResponse.user.vehicles,
      rfid: profileResponse.user.rfid,
      userID: profileResponse.user.userID,
      role: profileResponse.user.role,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchActivityLog = async (): Promise<ActivityLogData> => {
  try {
    const historyResponse = await handleApiResponse<ParkingSession[]>(
      apiClient.get<ApiResponse<ParkingSession[]>>(API_ENDPOINTS.HISTORY)
    );

    const logs = historyResponse.map((session, index) => ({
      id: index + 1,
      type: (session.out_date ? "keluar" : "masuk") as "masuk" | "keluar",
      time: session.out_date
        ? new Date(session.out_date).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : new Date(session.in_date).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
      vehicle_plate: session.vehicle_plate,
      billing: session.total_billing,
      status: session.payment_status,
    }));

    return { logs };
  } catch (error: any) {
    console.error("Error fetching activity log:", error);
    if (error.message.includes("404") || error.message.includes("not found")) {
      return { logs: [] };
    }
    throw error;
  }
};

// ===== WALLET FUNCTIONS =====

export const topUpBalance = async (amount: number): Promise<TopUpResponse> => {
  try {
    console.log(`Starting top up request for amount: ${amount}`);

    const response = await handleApiResponse<BackendWallet>(
      apiClient.post<ApiResponse<BackendWallet>>(API_ENDPOINTS.TOPUP, {
        amount,
      })
    );

    console.log("Top up response received:", response);

    return {
      success: true,
      newBalance: response.current_balance,
    };
  } catch (error: any) {
    console.error("Error processing top up:", error);

    // Enhanced error handling for different types of errors
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      throw new Error(
        "Request timeout - Please check your internet connection and try again"
      );
    } else if (
      error.code === "ENOTFOUND" ||
      error.message.includes("Network Error")
    ) {
      throw new Error(
        "Unable to connect to server - Please check your internet connection"
      );
    } else if (error.response?.status === 500) {
      throw new Error("Server error - Please try again later");
    } else if (error.response?.status === 401) {
      throw new Error("Authentication failed - Please login again");
    } else if (error.response?.status === 403) {
      throw new Error("Access denied - Please check your permissions");
    } else if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }

    throw error;
  }
};

// ===== PARKING FUNCTIONS =====

export const checkVehicleStatus = async () => {
  try {
    const response = await handleApiResponse<ParkingSession>(
      apiClient.get<ApiResponse<ParkingSession>>(API_ENDPOINTS.ACTIVE)
    );

    if (response) {
      return {
        isParked: true,
        location: "Smart Park Area",
        entryTime: new Date(response.in_date).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        vehicle_plate: response.vehicle_plate,
        parkID: response.parkID,
      };
    } else {
      return {
        isParked: false,
      };
    }
  } catch (error: any) {
    if (error.message.includes("404") || error.message.includes("not found")) {
      return {
        isParked: false,
      };
    }
    console.error("Error checking vehicle status:", error);
    throw error;
  }
};

export const checkInVehicle = async (
  vehiclePlate: string
): Promise<ParkingActionResponse> => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (!userData) {
      throw new Error("User data not found");
    }

    const user: BackendUser = JSON.parse(userData);
    if (!user.rfid) {
      throw new Error("RFID not assigned to user");
    }

    const response = await handleApiResponse<ParkingSession>(
      apiClient.post<ApiResponse<ParkingSession>>(API_ENDPOINTS.CHECKIN, {
        rfid: user.rfid,
        vehicle_plate: vehiclePlate,
      })
    );

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    console.error("Check-in error:", error);
    return {
      success: false,
      error: error.message || "Check-in failed",
    };
  }
};

export const checkOutVehicle = async (
  vehiclePlate: string
): Promise<ParkingActionResponse> => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (!userData) {
      throw new Error("User data not found");
    }

    const user: BackendUser = JSON.parse(userData);
    if (!user.rfid) {
      throw new Error("RFID not assigned to user");
    }

    const response = await handleApiResponse<ParkingSession>(
      apiClient.post<ApiResponse<ParkingSession>>(API_ENDPOINTS.CHECKOUT, {
        rfid: user.rfid,
        vehicle_plate: vehiclePlate,
      })
    );

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    console.error("Check-out error:", error);
    return {
      success: false,
      error: error.message || "Check-out failed",
    };
  }
};

// ===== AUTHENTICATION FUNCTIONS =====

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.LOGIN,
      { email, password }
    );

    if (response.data.status === "success" && response.data.data) {
      await AsyncStorage.setItem(
        STORAGE_KEYS.JWT_TOKEN,
        response.data.data.token
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_DATA,
        JSON.stringify(response.data.data.user)
      );

      return {
        success: true,
        user: response.data.data.user,
        token: response.data.data.token,
      };
    } else {
      return {
        success: false,
        error: response.data.error || "Login failed",
      };
    }
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error.response?.data?.error || error.message || "Network error",
    };
  }
};

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
  vehicles?: Array<{ plate: string; description: string }>;
  role?: "admin" | "user";
}): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await apiClient.post<ApiResponse<BackendUser>>(
      API_ENDPOINTS.REGISTER,
      userData
    );

    if (response.data.status === "success") {
      return { success: true };
    } else {
      return {
        success: false,
        error: response.data.error || "Registration failed",
      };
    }
  } catch (error: any) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error.response?.data?.error || error.message || "Network error",
    };
  }
};

export const updateProfile = async (profileData: {
  username?: string;
  email?: string;
  password?: string;
  vehicles?: Array<{ plate: string; description: string }>;
}): Promise<VehicleManagementResponse> => {
  try {
    const response = await handleApiResponse<BackendUser>(
      apiClient.put<ApiResponse<BackendUser>>(
        API_ENDPOINTS.PROFILE,
        profileData
      )
    );

    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_DATA,
      JSON.stringify(response)
    );

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    console.error("Update profile error:", error);
    return {
      success: false,
      error: error.message || "Failed to update profile",
    };
  }
};

// ===== VEHICLE MANAGEMENT FUNCTIONS =====

export const addVehicle = async (
  plate: string,
  description: string = ""
): Promise<VehicleManagementResponse> => {
  try {
    const response = await handleApiResponse<BackendUser>(
      apiClient.post<ApiResponse<BackendUser>>(API_ENDPOINTS.VEHICLE, {
        plate,
        description,
      })
    );

    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_DATA,
      JSON.stringify(response)
    );

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    console.error("Add vehicle error:", error);
    return {
      success: false,
      error: error.message || "Failed to add vehicle",
    };
  }
};

export const updateVehicleDescription = async (
  plate: string,
  description: string
): Promise<VehicleManagementResponse> => {
  try {
    const response = await handleApiResponse<BackendUser>(
      apiClient.put<ApiResponse<BackendUser>>(API_ENDPOINTS.VEHICLE, {
        plate,
        description,
      })
    );

    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_DATA,
      JSON.stringify(response)
    );

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    console.error("Update vehicle description error:", error);
    return {
      success: false,
      error: error.message || "Failed to update vehicle description",
    };
  }
};

export const removeVehicle = async (
  plate: string
): Promise<VehicleManagementResponse> => {
  try {
    const response = await handleApiResponse<BackendUser>(
      apiClient.delete<ApiResponse<BackendUser>>(
        `${API_ENDPOINTS.VEHICLE}/${plate}`
      )
    );

    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_DATA,
      JSON.stringify(response)
    );

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    console.error("Remove vehicle error:", error);
    return {
      success: false,
      error: error.message || "Failed to remove vehicle",
    };
  }
};

export const getUserVehicles = async (): Promise<{
  success: boolean;
  vehicles?: Array<{ plate: string; description: string }>;
  error?: string;
}> => {
  try {
    const userData = await getCurrentUser();
    if (!userData) {
      return {
        success: false,
        error: "User data not found",
      };
    }

    return {
      success: true,
      vehicles: userData.vehicles || [],
    };
  } catch (error: any) {
    console.error("Get user vehicles error:", error);
    return {
      success: false,
      error: error.message || "Failed to get user vehicles",
    };
  }
};

export const isVehicleRegistered = async (plate: string): Promise<boolean> => {
  try {
    const userData = await getCurrentUser();
    if (!userData || !userData.vehicles) {
      return false;
    }

    return userData.vehicles.some((vehicle) => vehicle.plate === plate);
  } catch (error) {
    console.error("Error checking vehicle registration:", error);
    return false;
  }
};

// ===== ADMIN FUNCTIONS =====

export const getAllUsers = async (): Promise<{
  success: boolean;
  data?: BackendUser[];
  error?: string;
}> => {
  try {
    const response = await handleApiResponse<BackendUser[]>(
      apiClient.get<ApiResponse<BackendUser[]>>(API_ENDPOINTS.ALL_USERS)
    );

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    console.error("Get all users error:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch users",
    };
  }
};

export const addRfidToUser = async (
  userID: string,
  rfid: string
): Promise<{
  success: boolean;
  data?: BackendUser;
  error?: string;
}> => {
  try {
    const response = await handleApiResponse<BackendUser>(
      apiClient.post<ApiResponse<BackendUser>>(API_ENDPOINTS.ADMIN_RFID, {
        userID,
        rfid,
      })
    );

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    console.error("Add RFID error:", error);
    return {
      success: false,
      error: error.message || "Failed to add RFID",
    };
  }
};

export const removeRfidFromUser = async (
  userID: string
): Promise<{
  success: boolean;
  data?: BackendUser;
  error?: string;
}> => {
  try {
    const response = await handleApiResponse<BackendUser>(
      apiClient.delete<ApiResponse<BackendUser>>(
        `${API_ENDPOINTS.ADMIN_RFID}/${userID}`
      )
    );

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    console.error("Remove RFID error:", error);
    return {
      success: false,
      error: error.message || "Failed to remove RFID",
    };
  }
};

export const migrateVehicleData = async (): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> => {
  try {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.MIGRATE_VEHICLES
    );

    if (response.data.status === "success") {
      return {
        success: true,
        message:
          response.data.data?.message || "Migration completed successfully",
      };
    } else {
      return {
        success: false,
        error: response.data.error || "Migration failed",
      };
    }
  } catch (error: any) {
    console.error("Migrate vehicle data error:", error);
    return {
      success: false,
      error: error.message || "Failed to migrate vehicle data",
    };
  }
};

// ===== UTILITY FUNCTIONS =====

export const isUserLoggedIn = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
  return !!token;
};

export const logoutUser = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
  await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
};

export const getCurrentUser = async (): Promise<BackendUser | null> => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export const refreshUserData = async (): Promise<void> => {
  try {
    const profileResponse = await handleApiResponse<ProfileResponse>(
      apiClient.get<ApiResponse<ProfileResponse>>(API_ENDPOINTS.PROFILE)
    );

    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_DATA,
      JSON.stringify(profileResponse.user)
    );
  } catch (error) {
    console.error("Error refreshing user data:", error);
    throw error;
  }
};

export const isUserAdmin = async (): Promise<boolean> => {
  try {
    const userData = await getCurrentUser();
    return userData?.role === "admin";
  } catch {
    return false;
  }
};

export const getStoredToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
  } catch {
    return null;
  }
};

export const clearUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.JWT_TOKEN,
      STORAGE_KEYS.USER_DATA,
    ]);
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};
