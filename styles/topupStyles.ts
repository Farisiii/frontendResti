import { StyleSheet } from "react-native";
import { responsive } from "../utils/responsive";

const numpadButtonSize = responsive.isPortrait()
  ? responsive.adaptiveWidth(25, 15)
  : responsive.adaptiveWidth(15, 12);

const buttonHeight = responsive.scaledSize(responsive.isPortrait() ? 55 : 45);

export const topUpStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F3C7",
  },
  headerContainer: {
    backgroundColor: "#E62132",
  },
  content: {
    flex: 1,
    padding: responsive.edgeInsets(12, 16, 20),
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#F9F3C7",
  },
  contentLandscape: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },

  amountContainer: {
    backgroundColor: "#FDD100",
    borderRadius: responsive.scaledSize(10),
    padding: responsive.spacing(16, 20, 24),
    alignItems: "center",
    marginBottom: responsive.spacing(8, 12, 16),
    width: "100%",
  },
  amountPrefix: {
    fontSize: responsive.fontSize(18, 20, 22),
    fontWeight: "bold",
    color: "#000",
  },
  amountText: {
    fontSize: responsive.fontSize(24, 28, 32),
    fontWeight: "bold",
    color: "#000",
    marginVertical: responsive.spacing(2, 4, 6),
  },
  minimalText: {
    fontSize: responsive.fontSize(11, 13, 15),
    color: "#000",
    marginTop: responsive.spacing(3, 5, 7),
  },

  predefinedAmountsContainer: {
    backgroundColor: "#F9AF1C",
    borderRadius: responsive.scaledSize(10),
    padding: responsive.spacing(10, 12, 14),
    marginBottom: responsive.spacing(12, 16, 20),
    width: "100%",
  },
  amountButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: responsive.spacing(6, 8, 10),
  },
  amountButton: {
    backgroundColor: "#007D4B",
    borderRadius: responsive.scaledSize(6),
    paddingVertical: responsive.spacing(6, 8, 10),
    paddingHorizontal: responsive.spacing(8, 12, 16),
    width: "30%",
    alignItems: "center",
  },
  selectedAmountButton: {
    backgroundColor: "#005D3B",
  },
  amountButtonText: {
    fontSize: responsive.fontSize(10, 12, 14),
    color: "white",
    fontWeight: "bold",
  },

  numpadContainer: {
    backgroundColor: "#FDD100",
    borderRadius: responsive.scaledSize(10),
    padding: responsive.spacing(8, 12, 16),
    alignItems: "center",
    width: "100%",
    marginBottom: 0,
  },
  numpadRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: responsive.spacing(6, 8, 10),
  },
  numButton: {
    backgroundColor: "#F9AF1C",
    borderRadius: responsive.scaledSize(8),
    justifyContent: "center",
    alignItems: "center",
    width: numpadButtonSize,
    height: buttonHeight,
    margin: responsive.spacing(2, 3, 4),
  },
  numButtonText: {
    fontSize: responsive.fontSize(20, 24, 28),
    fontWeight: "bold",
    color: "#000",
  },
  actionButton: {
    borderRadius: responsive.scaledSize(8),
    justifyContent: "center",
    alignItems: "center",
    width: numpadButtonSize,
    height: buttonHeight,
    margin: responsive.spacing(2, 3, 4),
  },
  deleteButton: {
    backgroundColor: "#E74C3C",
  },
  completeButton: {
    backgroundColor: "#007D4B",
  },
  actionButtonText: {
    fontSize: responsive.fontSize(14, 16, 18),
    color: "white",
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: responsive.edgeInsets(16, 16, 16),
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: responsive.scaledSize(12),
    width: "100%",
    maxWidth: responsive.clampedSize(responsive.width(90), 300, 400),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    backgroundColor: "#F9F3C7",
    paddingVertical: responsive.spacing(12, 16, 20),
    paddingHorizontal: responsive.spacing(12, 16, 20),
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalTitle: {
    fontSize: responsive.fontSize(16, 18, 20),
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  modalBody: {
    padding: responsive.spacing(16, 20, 24),
    alignItems: "center",
  },
  warningIcon: {
    marginBottom: responsive.spacing(12, 16, 20),
  },
  modalMessage: {
    fontSize: responsive.fontSize(14, 16, 18),
    color: "#333",
    textAlign: "center",
    marginBottom: responsive.spacing(12, 16, 20),
  },
  infoContainer: {
    backgroundColor: "#F9F3C7",
    padding: responsive.spacing(10, 12, 14),
    borderRadius: responsive.scaledSize(8),
    width: "100%",
    alignItems: "center",
  },
  infoText: {
    fontSize: responsive.fontSize(14, 16, 18),
    fontWeight: "bold",
    color: "#000",
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  okButton: {
    paddingVertical: responsive.spacing(12, 16, 20),
    alignItems: "center",
    backgroundColor: "#007D4B",
  },
  okButtonText: {
    fontSize: responsive.fontSize(14, 16, 18),
    fontWeight: "500",
    color: "#FFFFFF",
  },
  // Amount Display
  amountLabel: {
    fontSize: responsive.scaledSize(16),
    color: "#666",
    marginBottom: responsive.scaledSize(8),
  },

  // Predefined Amounts
  predefinedContainer: {
    marginBottom: responsive.scaledSize(24),
  },
  predefinedTitle: {
    fontSize: responsive.scaledSize(16),
    fontWeight: "600",
    color: "#333",
    marginBottom: responsive.scaledSize(12),
  },
  predefinedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  predefinedButton: {
    width: "48%",
    paddingVertical: responsive.scaledSize(12),
    paddingHorizontal: responsive.scaledSize(16),
    backgroundColor: "#FFF",
    borderRadius: responsive.scaledSize(8),
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    marginBottom: responsive.scaledSize(8),
  },
  predefinedButtonSelected: {
    backgroundColor: "#E62132",
    borderColor: "#E62132",
  },
  predefinedButtonText: {
    fontSize: responsive.scaledSize(14),
    color: "#333",
    fontWeight: "500",
  },
  predefinedButtonTextSelected: {
    color: "#FFF",
  },

  numpadButton: {
    width: responsive.scaledSize(80),
    height: responsive.scaledSize(80),
    borderRadius: responsive.scaledSize(40),
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  numpadButtonText: {
    fontSize: responsive.scaledSize(24),
    fontWeight: "bold",
    color: "#333",
  },
  completeButtonText: {
    fontSize: responsive.scaledSize(16),
    fontWeight: "bold",
    color: "#FFF",
  },

  // Loading Modal
  loadingModalBody: {
    paddingVertical: responsive.scaledSize(40),
    paddingHorizontal: responsive.scaledSize(20),
    alignItems: "center",
  },
  loadingText: {
    fontSize: responsive.scaledSize(16),
    color: "#333",
    marginTop: responsive.scaledSize(16),
    textAlign: "center",
  },
});
