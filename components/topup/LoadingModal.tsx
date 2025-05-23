import React from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";
import { topUpStyles } from "../../styles/topupStyles";

interface LoadingModalProps {
  visible: boolean;
  message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  visible,
  message = "Memproses top up...",
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='fade'
      onRequestClose={() => {}} // Prevent dismissal during loading
    >
      <View style={topUpStyles.modalOverlay}>
        <View style={topUpStyles.modalContainer}>
          <View style={topUpStyles.modalHeader}>
            <Text style={topUpStyles.modalTitle}>Memproses Pembayaran</Text>
          </View>

          <View style={topUpStyles.loadingModalBody}>
            <ActivityIndicator size='large' color='#E62132' />
            <Text style={topUpStyles.loadingText}>{message}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
