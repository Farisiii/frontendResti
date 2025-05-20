export interface DynamicStyles {
  content: {
    paddingHorizontal: number
    paddingTop: number
  }
  successCard: {
    padding: number
    marginTop: number
  }
  successIcon: {
    width: number
    height: number
    borderRadius: number
  }
  iconSize: number
  detailLabel: {
    fontSize: number
  }
  detailValue: {
    fontSize: number
  }
  totalLabel: {
    fontSize: number
  }
  totalValue: {
    fontSize: number
  }
  detailContainer: {
    padding: number
    marginBottom: number
  }
  buttonText: {
    fontSize: number
  }
  buttonPadding: {
    padding: number
  }
}

export interface TransactionData {
  date: string
  time: string
  amount: string
  total: string
}

export const DEFAULT_TRANSACTION: TransactionData = {
  date: '06/05/2025',
  time: '09.10',
  amount: 'Rp50.000,00',
  total: 'Rp50.000,00',
}
