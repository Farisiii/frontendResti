import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF1E2',
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
    padding: 16, // Consolidated padding
  },
  successIconContainer: {
    alignItems: 'center',
    marginBottom: 16, // Reduced from 20
  },
  successIcon: {
    backgroundColor: '#3F7F38',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // NEW: Compact container for all details
  compactDetailsContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
  },

  // Unified detail row style
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6, // Reduced spacing between rows
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },

  detailLabel: {
    color: '#666666',
    fontSize: 14,
  },
  detailValue: {
    color: '#333333',
    fontWeight: '500',
    fontSize: 14,
  },

  // Total row - same structure as detail row but with styling
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginTop: 4, // Minimal spacing from other rows
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 16, // Slightly larger for emphasis
  },
  totalValue: {
    fontWeight: 'bold',
    color: '#3F7F38',
    fontSize: 16, // Slightly larger for emphasis
  },

  buttonContainer: {
    padding: 16,
    backgroundColor: '#FAF1E2',
    marginTop: 12, // Reduced from implicit larger spacing
  },
  completeButton: {
    backgroundColor: '#3F7F38',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // DEPRECATED - keeping for backward compatibility but not used in redesign
  detailContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingVertical: 12, // Old spacing
  },
  totalSection: {
    paddingTop: 15, // Old spacing
  },
})
