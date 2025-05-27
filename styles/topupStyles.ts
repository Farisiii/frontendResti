import { StyleSheet } from 'react-native'
import { responsive } from '../utils/responsive'

const numpadButtonSize = responsive.isPortrait()
  ? responsive.adaptiveWidth(25, 15)
  : responsive.adaptiveWidth(15, 12)

const buttonHeight = responsive.scaledSize(responsive.isPortrait() ? 55 : 45)

export const topUpStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF1E2',
  },
  headerContainer: {
    backgroundColor: '#E62132',
  },
  content: {
    flex: 1,
    padding: responsive.edgeInsets(12, 16, 20),
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#FAF1E2',
  },
  contentLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  // Legacy styles (keeping for backward compatibility)
  amountContainer: {
    backgroundColor: '#FDD100',
    borderRadius: responsive.scaledSize(10),
    padding: responsive.spacing(16, 20, 24),
    alignItems: 'center',
    marginBottom: responsive.spacing(8, 12, 16),
    width: '100%',
  },
  amountPrefix: {
    fontSize: responsive.fontSize(18, 20, 22),
    fontWeight: 'bold',
    color: '#000',
  },
  amountText: {
    fontSize: responsive.fontSize(24, 28, 32),
    fontWeight: 'bold',
    color: '#000',
    marginVertical: responsive.spacing(2, 4, 6),
  },
  minimalText: {
    fontSize: responsive.fontSize(11, 13, 15),
    color: '#000',
    marginTop: responsive.spacing(3, 5, 7),
  },

  predefinedAmountsContainer: {
    backgroundColor: '#F9AF1C',
    borderRadius: responsive.scaledSize(10),
    padding: responsive.spacing(10, 12, 14),
    marginBottom: responsive.spacing(12, 16, 20),
    width: '100%',
  },
  amountButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: responsive.spacing(6, 8, 10),
  },
  amountButton: {
    backgroundColor: '#007D4B',
    borderRadius: responsive.scaledSize(6),
    paddingVertical: responsive.spacing(6, 8, 10),
    paddingHorizontal: responsive.spacing(8, 12, 16),
    width: '30%',
    alignItems: 'center',
  },
  selectedAmountButton: {
    backgroundColor: '#005D3B',
  },
  amountButtonText: {
    fontSize: responsive.fontSize(10, 12, 14),
    color: 'white',
    fontWeight: 'bold',
  },

  numpadContainer: {
    backgroundColor: '#FDD100',
    borderRadius: responsive.scaledSize(10),
    padding: responsive.spacing(8, 12, 16),
    alignItems: 'center',
    width: '100%',
    marginBottom: 0,
  },
  numpadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: responsive.spacing(6, 8, 10),
  },
  numButton: {
    backgroundColor: '#F9AF1C',
    borderRadius: responsive.scaledSize(8),
    justifyContent: 'center',
    alignItems: 'center',
    width: numpadButtonSize,
    height: buttonHeight,
    margin: responsive.spacing(2, 3, 4),
  },
  numButtonText: {
    fontSize: responsive.fontSize(20, 24, 28),
    fontWeight: 'bold',
    color: '#000',
  },
  actionButton: {
    borderRadius: responsive.scaledSize(8),
    justifyContent: 'center',
    alignItems: 'center',
    width: numpadButtonSize,
    height: buttonHeight,
    margin: responsive.spacing(2, 3, 4),
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
  },
  completeButton: {
    backgroundColor: '#007D4B',
  },
  actionButtonText: {
    fontSize: responsive.fontSize(14, 16, 18),
    color: 'white',
    fontWeight: 'bold',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsive.edgeInsets(16, 16, 16),
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: responsive.scaledSize(12),
    width: '100%',
    maxWidth: responsive.clampedSize(responsive.width(90), 300, 400),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    backgroundColor: '#FAF1E2',
    paddingVertical: responsive.spacing(12, 16, 20),
    paddingHorizontal: responsive.spacing(12, 16, 20),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: responsive.fontSize(16, 18, 20),
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  modalBody: {
    padding: responsive.spacing(16, 20, 24),
    alignItems: 'center',
  },
  warningIcon: {
    marginBottom: responsive.spacing(12, 16, 20),
  },
  modalMessage: {
    fontSize: responsive.fontSize(14, 16, 18),
    color: '#333',
    textAlign: 'center',
    marginBottom: responsive.spacing(12, 16, 20),
  },
  infoContainer: {
    backgroundColor: '#FAF1E2',
    padding: responsive.spacing(10, 12, 14),
    borderRadius: responsive.scaledSize(8),
    width: '100%',
    alignItems: 'center',
  },
  infoText: {
    fontSize: responsive.fontSize(14, 16, 18),
    fontWeight: 'bold',
    color: '#000',
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  okButton: {
    paddingVertical: responsive.spacing(12, 16, 20),
    alignItems: 'center',
    backgroundColor: '#007D4B',
  },
  okButtonText: {
    fontSize: responsive.fontSize(14, 16, 18),
    fontWeight: '500',
    color: '#FFFFFF',
  },

  // Loading Modal
  loadingModalBody: {
    paddingVertical: responsive.scaledSize(40),
    paddingHorizontal: responsive.scaledSize(20),
    alignItems: 'center',
  },
  loadingText: {
    fontSize: responsive.scaledSize(16),
    color: '#333',
    marginTop: responsive.scaledSize(16),
    textAlign: 'center',
  },

  // MODERN STYLES - Updated Amount Display
  amountDisplay: {
    backgroundColor: '#FDD100',
    borderRadius: responsive.scaledSize(10),
    padding: responsive.spacing(16, 20, 24),
    alignItems: 'center',
    marginBottom: responsive.spacing(16, 20, 24),
    width: '100%',
  },
  amountLabel: {
    fontSize: responsive.fontSize(14, 16, 18),
    color: '#111',
    fontWeight: 'bold',
    marginBottom: responsive.spacing(6, 8, 10),
  },
  amountValue: {
    color: '#000',
    fontSize: responsive.fontSize(22, 24, 28),
    fontWeight: 'bold',
    marginBottom: responsive.spacing(6, 8, 10),
  },
  minAmountInfo: {
    color: '#333',
    fontSize: responsive.fontSize(12, 14, 16),
  },

  // Modern Predefined Amounts (matching the image design)
  optionsContainer: {
    marginBottom: responsive.spacing(20, 24, 28),
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing(2, 4, 6),
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: responsive.scaledSize(12),
    paddingVertical: responsive.spacing(12, 14, 16),
    paddingHorizontal: responsive.spacing(8, 10, 12),
    width: '31.5%',
    alignItems: 'center',
    marginBottom: responsive.spacing(10, 12, 14),
    borderWidth: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  selectedOption: {
    backgroundColor: '#28A745',
    borderWidth: 0,
  },
  optionText: {
    color: '#000',
    fontWeight: '600',
    fontSize: responsive.fontSize(13, 15, 17),
  },
  selectedOptionText: {
    color: '#FFF',
    fontWeight: '700',
  },

  // Modern Keypad Styles (positioned well, matching image spacing)
  keypadContainer: {
    flex: 1,
    marginTop: responsive.spacing(16, 20, 24),
    marginBottom: responsive.spacing(8, 10, 12),
  },
  keypadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: responsive.spacing(20, 24, 28),
    paddingHorizontal: responsive.spacing(2, 4, 6),
  },
  keypadButton: {
    backgroundColor: '#FDD100',
    borderRadius: responsive.scaledSize(12),
    width: '31.5%',
    height: responsive.scaledSize(60),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing(10, 12, 14),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  keypadZeroButton: {
    width: '64.5%',
  },
  keypadButtonText: {
    fontSize: responsive.fontSize(22, 26, 30),
    fontWeight: 'bold',
    color: '#000',
  },
  confirmButton: {
    backgroundColor: '#28A745',
    borderRadius: responsive.scaledSize(12),
    paddingVertical: responsive.spacing(16, 20, 24),
    paddingHorizontal: responsive.spacing(12, 16, 20),
    alignItems: 'center',
    marginTop: responsive.spacing(4, 6, 8),
    marginHorizontal: responsive.spacing(2, 4, 6),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    elevation: 0,
    shadowOpacity: 0,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: responsive.fontSize(14, 16, 18),
    fontWeight: 'bold',
  },

  // Additional responsive styles for better keypad
  numpadButton: {
    width: responsive.scaledSize(70),
    height: responsive.scaledSize(70),
    borderRadius: responsive.scaledSize(10),
    backgroundColor: '#FFCC33',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: responsive.spacing(2, 3, 4),
  },
  numpadButtonText: {
    fontSize: responsive.fontSize(20, 24, 28),
    fontWeight: 'bold',
    color: '#000',
  },
  completeButtonText: {
    fontSize: responsive.fontSize(14, 16, 18),
    fontWeight: 'bold',
    color: '#FFF',
  },

  // Predefined Amounts - Additional styles for consistency
  predefinedContainer: {
    marginBottom: responsive.spacing(20, 24, 28),
  },
  predefinedTitle: {
    fontSize: responsive.fontSize(14, 16, 18),
    fontWeight: '600',
    color: '#333',
    marginBottom: responsive.spacing(10, 12, 14),
  },
  predefinedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  predefinedButton: {
    width: '48%',
    paddingVertical: responsive.spacing(10, 12, 14),
    paddingHorizontal: responsive.spacing(12, 16, 20),
    backgroundColor: '#FFF',
    borderRadius: responsive.scaledSize(8),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    marginBottom: responsive.spacing(6, 8, 10),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  predefinedButtonSelected: {
    backgroundColor: '#0D9F61',
    borderColor: '#0D9F61',
  },
  predefinedButtonText: {
    fontSize: responsive.fontSize(12, 14, 16),
    color: '#333',
    fontWeight: '500',
  },
  predefinedButtonTextSelected: {
    color: '#FFF',
  },
})
