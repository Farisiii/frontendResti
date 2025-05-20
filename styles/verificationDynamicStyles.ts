import { responsive } from '@/utils/responsive'

export const getVerificationDynamicStyles = () => {
  return {
    content: {
      paddingHorizontal: responsive.spacing(12, 16, 20),
      paddingTop: responsive.spacing(15, 20, 30),
    },
    successCard: {
      padding: responsive.spacing(15, 20, 25),
      marginTop: responsive.spacing(10, 15, 20),
    },
    successIcon: {
      width: responsive.spacing(70, 80, 90),
      height: responsive.spacing(70, 80, 90),
      borderRadius: responsive.spacing(35, 40, 45),
    },
    iconSize: responsive.fontSize(38, 43, 48),
    detailLabel: {
      fontSize: responsive.fontSize(14, 16, 18),
    },
    detailValue: {
      fontSize: responsive.fontSize(14, 16, 18),
    },
    totalLabel: {
      fontSize: responsive.fontSize(16, 18, 20),
    },
    totalValue: {
      fontSize: responsive.fontSize(16, 18, 20),
    },
    detailContainer: {
      padding: responsive.spacing(12, 15, 18),
      marginBottom: responsive.spacing(10, 13, 16),
    },
    buttonText: {
      fontSize: responsive.fontSize(14, 16, 18),
    },
    buttonPadding: {
      padding: responsive.spacing(16, 18, 22),
    },
  }
}
