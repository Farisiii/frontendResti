import { Platform, StatusBar, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F3C7',
  },
  headerContainer: {
    backgroundColor: '#E62132',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F3C7',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#F9F3C7',
    paddingBottom: Platform.OS === 'ios' ? 20 : 16,
  },
  contentLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: '5%',
  },
  pinContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    width: '100%',
  },
  pinDotsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  pinDot: {
    borderRadius: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#00A884',
  },
  pinDotFilled: {
    backgroundColor: '#00A884',
  },
  pinDotError: {
    backgroundColor: '#E74C3C',
    borderColor: '#E74C3C',
  },
  forgotPinText: {
    color: '#E62132',
    marginTop: 10,
    fontSize: 14,
  },
  numpadContainer: {
    backgroundColor: '#FDD100',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto',
    marginBottom: 0,
  },
  numpadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  numButton: {
    backgroundColor: '#F9AF1C',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  actionButton: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
  },
  completeButton: {
    backgroundColor: '#007D4B',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
