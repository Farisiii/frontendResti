import { responsive } from '@/utils/responsive'
import { Platform, StyleSheet } from 'react-native'

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E53E3E',
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: responsive.height(100),
  },
  header: {
    paddingTop:
      Platform.OS === 'ios'
        ? responsive.spacing(50, 60, 70)
        : responsive.spacing(30, 40, 50),
    paddingBottom: responsive.spacing(30, 40, 50),
    alignItems: 'center',
    backgroundColor: '#E53E3E',
    borderBottomLeftRadius: responsive.spacing(25, 30, 35),
    borderBottomRightRadius: responsive.spacing(25, 30, 35),
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImageContainer: {
    width: responsive.spacing(110, 135, 160),
    height: responsive.spacing(110, 135, 160),
    borderRadius: responsive.spacing(55, 67.5, 80),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing(12, 16, 20),
    padding: responsive.spacing(6, 8, 10),
  },
  logoImage: {
    width: responsive.spacing(150, 180, 210),
    height: responsive.spacing(150, 180, 210),
  },
  logoText: {
    fontSize: responsive.fontSize(28, 32, 36),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
    paddingHorizontal: responsive.spacing(10, 15, 20),
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: responsive.spacing(25, 30, 35),
    borderTopRightRadius: responsive.spacing(25, 30, 35),
    paddingHorizontal: responsive.spacing(20, 24, 32),
    paddingTop: responsive.spacing(30, 40, 50),
    paddingBottom: responsive.spacing(24, 32, 40),
    marginTop: -30,
  },
  demoContainer: {
    backgroundColor: '#FFF3CD',
    borderRadius: responsive.spacing(10, 12, 15),
    padding: responsive.spacing(12, 16, 20),
    marginBottom: responsive.spacing(20, 24, 28),
    borderWidth: 1,
    borderColor: '#FDD100',
  },
  demoTitle: {
    fontSize: responsive.fontSize(12, 14, 16),
    fontWeight: '600',
    color: '#856404',
    marginBottom: responsive.spacing(10, 12, 15),
    textAlign: 'center',
  },
  demoButton: {
    backgroundColor: '#FDD100',
    borderRadius: responsive.spacing(6, 8, 10),
    paddingVertical: responsive.spacing(8, 10, 12),
    paddingHorizontal: responsive.spacing(12, 16, 20),
    alignItems: 'center',
  },
  demoButtonText: {
    color: '#000000',
    fontSize: responsive.fontSize(12, 14, 16),
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: responsive.spacing(16, 20, 24),
  },
  inputLabel: {
    fontSize: responsive.fontSize(14, 16, 18),
    fontWeight: '600',
    marginBottom: responsive.spacing(6, 8, 10),
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: responsive.spacing(10, 12, 15),
    borderWidth: 2,
    borderColor: '#E9ECEF',
    paddingHorizontal: responsive.spacing(12, 16, 20),
    height: responsive.spacing(48, 56, 64),
  },
  inputIcon: {
    marginRight: responsive.spacing(10, 12, 15),
  },
  textInput: {
    flex: 1,
    fontSize: responsive.fontSize(14, 16, 18),
    height: '100%',
    color: '#333',
    outlineWidth: 0,
  },
  eyeIcon: {
    padding: responsive.spacing(3, 4, 5),
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: responsive.spacing(24, 32, 40),
  },
  forgotPasswordText: {
    fontSize: responsive.fontSize(12, 14, 16),
    color: '#E53E3E',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#FDD100',
    borderRadius: responsive.spacing(10, 12, 15),
    height: responsive.spacing(48, 56, 64),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing(8, 20, 28),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: responsive.fontSize(16, 18, 20),
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing(12, 20, 28),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: responsive.spacing(12, 16, 20),
    fontSize: responsive.fontSize(12, 14, 16),
    color: '#666666',
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: responsive.spacing(12, 20, 28),
  },
  signUpText: {
    fontSize: responsive.fontSize(12, 14, 16),
    color: '#666666',
  },
  signUpLink: {
    fontSize: responsive.fontSize(12, 14, 16),
    color: '#E53E3E',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing(16, 20, 24),
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: responsive.spacing(16, 20, 24),
    padding: responsive.spacing(20, 24, 28),
    width: '100%',
    maxWidth: responsive.width(90),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.spacing(12, 16, 20),
  },
  modalTitle: {
    fontSize: responsive.fontSize(18, 20, 22),
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: responsive.spacing(3, 4, 5),
  },
  modalDescription: {
    fontSize: responsive.fontSize(12, 14, 16),
    color: '#666',
    marginBottom: responsive.spacing(20, 24, 28),
    lineHeight: responsive.fontSize(18, 20, 22),
  },
  modalInputContainer: {
    marginBottom: responsive.spacing(20, 24, 28),
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: responsive.spacing(10, 12, 15),
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: responsive.spacing(10, 12, 15),
    height: responsive.spacing(44, 48, 52),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  cancelButtonText: {
    fontSize: responsive.fontSize(14, 16, 18),
    fontWeight: '600',
    color: '#666',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#E53E3E',
    borderRadius: responsive.spacing(10, 12, 15),
    height: responsive.spacing(44, 48, 52),
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: responsive.fontSize(14, 16, 18),
    fontWeight: '600',
    color: '#FFFFFF',
  },
})
