import Constants from 'expo-constants'
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native'

const { width, height } = Dimensions.get('window')

interface SmartParkStyles {
  container: ViewStyle
  header: ViewStyle
  backButton: ViewStyle
  logoutButton: ViewStyle
  rightSection: ViewStyle
  profileButton: ViewStyle
  headerTitle: TextStyle
  balanceContainer: ViewStyle
  balanceLabel: TextStyle
  balanceRow: ViewStyle
  balanceAmount: TextStyle
  actionButtonsContainer: ViewStyle
  actionButton: ViewStyle
  actionButtonText: TextStyle
  logButton: ViewStyle
  logButtonText: TextStyle
  logButtonActive: ViewStyle // Tambahkan ini juga
  activityLogContainer: ViewStyle
  activityLogContainerEmpty: ViewStyle // Tambahkan ini
  logRow: ViewStyle
  logIdText: TextStyle
  logTypeText: TextStyle
  logTypeTextIn: TextStyle
  logTypeTextOut: TextStyle
  logTimeText: TextStyle
  loadingContainer: ViewStyle
  errorText: TextStyle
  emptyStateContainer: ViewStyle // Tambahkan ini juga
  emptyStateText: TextStyle // Dan ini
}

export const colors = {
  primary: '#E32636',
  secondary: '#FFD700',
  background: '#FAF1E2',
  success: '#00A86B',
  error: '#FF3B30',
  text: '#000000',
  textSecondary: '#777777',
  border: '#dddddd',
  white: '#FFFFFF',
}

export const smartParkStyles = StyleSheet.create<SmartParkStyles>({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 0,
    ...(Platform.OS === 'web'
      ? {
          height: Platform.select({ web: '100vh' }) as any,
          overflow: Platform.select({ web: 'auto', default: 'visible' }) as any,
        }
      : {}),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 10,
    paddingTop: Platform.select({
      android: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 25,
      ios: Constants.statusBarHeight ? Constants.statusBarHeight + 10 : 15,
      default: 15,
    }),
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.select({
      android: 4,
      default: 0,
    }),
  },
  logoutButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: Platform.select({
      android: 4,
      default: 0,
    }),
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 40,
  },
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  balanceContainer: {
    backgroundColor: colors.white,
    margin: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  balanceLabel: {
    fontSize: 14,
    color: '#333',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
    zIndex: 10, // Pastikan action buttons selalu di atas
  },
  actionButton: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  logButton: {
    width: '70%',
    alignSelf: 'center',
    backgroundColor: colors.secondary,
    marginTop: 0,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 15, // Lebih tinggi dari action buttons
    position: 'relative',
  },
  logButtonActive: {
    width: '70%',
    alignSelf: 'center',
    backgroundColor: colors.secondary,
    marginTop: 0,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 15,
    position: 'relative',
  },
  logButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  activityLogContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 15,
    borderRadius: 10,
    paddingTop: 30,
    marginTop: -25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
    zIndex: 5, // Lebih rendah dari buttons
    marginBottom: 20, // Tambahkan margin bawah untuk jarak dengan tombol
  },
  activityLogContainerEmpty: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 15,
    borderRadius: 10,
    marginTop: 0, // Margin normal untuk state kosong
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  logIdText: {
    width: 30,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  logTypeText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  logTypeTextIn: {
    color: colors.success,
  },
  logTypeTextOut: {
    color: colors.error,
  },
  logTimeText: {
    width: 60,
    fontSize: 16,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
})
