import { styles } from "@/styles/verificationStyles";
import React from "react";
import { Text, View } from "react-native";

interface TransactionDetailsProps {
  dynamicStyles: any;
  amount: string; // Amount dari TopUpScreen dalam format "50000"
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  dynamicStyles,
  amount,
}) => {
  // Fungsi untuk mengkonversi string amount ke format Rupiah
  const formatToRupiah = (amountString: string): string => {
    // Handle empty or invalid input
    if (!amountString || amountString === "0" || amountString === "undefined") {
      return "Rp0,00";
    }

    // Hapus semua karakter non-digit
    const numericAmount = amountString.replace(/\D/g, "");

    // Konversi ke number
    const number = parseInt(numericAmount, 10);

    // Jika NaN atau 0, return format default
    if (isNaN(number) || number === 0) {
      return "Rp0,00";
    }

    // Format ke Rupiah dengan separator ribuan
    const formatted = number.toLocaleString("id-ID");
    return `Rp${formatted},00`;
  };

  // Fungsi untuk mendapatkan tanggal saat ini dalam format DD/MM/YYYY
  const getCurrentDate = (): string => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month dimulai dari 0
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fungsi untuk mendapatkan waktu saat ini dalam format HH.MM
  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}.${minutes}`;
  };

  // Fungsi untuk verifikasi dan validasi tanggal
  const getVerifiedDate = (): string => {
    try {
      const currentDate = getCurrentDate();
      const dateObj = new Date();

      // Verifikasi bahwa tanggal valid
      if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
        return currentDate;
      } else {
        // Fallback jika ada error
        return "01/01/2025";
      }
    } catch (error) {
      console.warn("Date verification failed:", error);
      return "01/01/2025";
    }
  };

  // Fungsi untuk verifikasi dan validasi waktu
  const getVerifiedTime = (): string => {
    try {
      const currentTime = getCurrentTime();
      const now = new Date();

      // Verifikasi bahwa waktu valid
      if (now instanceof Date && !isNaN(now.getTime())) {
        return currentTime;
      } else {
        // Fallback jika ada error
        return "00.00";
      }
    } catch (error) {
      console.warn("Time verification failed:", error);
      return "00.00";
    }
  };

  // Process the amount and format it
  const formattedAmount = formatToRupiah(amount);
  const verifiedDate = getVerifiedDate();
  const verifiedTime = getVerifiedTime();

  // Debug logging untuk troubleshooting
  React.useEffect(() => {
    console.log("TransactionDetails received amount:", amount);
    console.log("Formatted amount:", formattedAmount);
  }, [amount, formattedAmount]);

  return (
    <>
      <View style={[styles.detailContainer, dynamicStyles.detailContainer]}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>
            Tanggal
          </Text>
          <Text style={[styles.detailValue, dynamicStyles.detailValue]}>
            {verifiedDate}
          </Text>
        </View>
      </View>

      <View style={[styles.detailContainer, dynamicStyles.detailContainer]}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>
            Waktu
          </Text>
          <Text style={[styles.detailValue, dynamicStyles.detailValue]}>
            {verifiedTime}
          </Text>
        </View>
      </View>

      <View style={[styles.detailContainer, dynamicStyles.detailContainer]}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>
            Jumlah
          </Text>
          <Text style={[styles.detailValue, dynamicStyles.detailValue]}>
            {formattedAmount}
          </Text>
        </View>
      </View>

      {/* Total Section - Responsive */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, dynamicStyles.totalLabel]}>
            TOTAL
          </Text>
          <Text style={[styles.totalValue, dynamicStyles.totalValue]}>
            {formattedAmount}
          </Text>
        </View>
      </View>
    </>
  );
};

export default TransactionDetails;
