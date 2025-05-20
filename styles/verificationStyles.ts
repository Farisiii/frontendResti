import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F3C7',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 480,
  },
  successCard: {
    backgroundColor: '#FDD100',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  successIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    backgroundColor: '#3F7F38',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: '#666666',
  },
  detailValue: {
    color: '#333333',
    fontWeight: '500',
  },
  totalSection: {
    paddingTop: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#333333',
  },
  totalValue: {
    fontWeight: 'bold',
    color: '#3F7F38',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#F9F3C7',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  completeButton: {
    backgroundColor: '#3F7F38',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
})
