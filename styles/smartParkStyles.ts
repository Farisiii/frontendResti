import Constants from 'expo-constants'
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native'

// Get screen dimensions
const { width, height } = Dimensions.get('window')

// Define style types
interface SmartParkStyles {
  container: ViewStyle
  header: ViewStyle
  backButton: ViewStyle
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
  activityLogContainer: ViewStyle
  logRow: ViewStyle
  logIdText: TextStyle
  logTypeText: TextStyle
  logTypeTextIn: TextStyle
  logTypeTextOut: TextStyle
  logTimeText: TextStyle
  loadingContainer: ViewStyle
  errorText: TextStyle
}

export const colors = {
  primary: '#E32636', // Red color for headers
  secondary: '#FFD700', // Gold color for buttons
  background: '#FAF1E2', // Light cream background
  success: '#00A86B', // Green for "masuk" status
  error: '#FF3B30', // Red for "keluar" status
  text: '#000000', // Black for main text
  textSecondary: '#777777', // Gray for secondary text
  border: '#dddddd', // Light gray for borders
  white: '#FFFFFF', // White
}

// Create and export styles
export const smartParkStyles = StyleSheet.create<SmartParkStyles>({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    maxWidth: 480, // Restrict max width for web
    width: '100%',
    alignSelf: 'center',
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
    padding: 5,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
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
    zIndex: 10,
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
    zIndex: 5,
    maxHeight: height - 50,
    bottom: 0, // Menempel di dasar layar
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
    color: colors.success, // Green color for "masuk"
  },
  logTypeTextOut: {
    color: colors.error, // Red color for "keluar"
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
})
