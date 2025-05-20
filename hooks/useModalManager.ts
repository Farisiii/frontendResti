import { useState } from 'react'

export const useModalManager = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  )

  const [isVehicleModalVisible, setIsVehicleModalVisible] = useState(false)

  const showDeleteConfirmation = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId)
    setIsDeleteModalVisible(true)
  }

  const cancelDeleteVehicle = () => {
    setIsDeleteModalVisible(false)
    setSelectedVehicleId(null)
  }

  const confirmDeleteVehicle = (deleteCallback: (id: string) => void) => {
    if (selectedVehicleId) {
      deleteCallback(selectedVehicleId)

      setIsDeleteModalVisible(false)
      setSelectedVehicleId(null)
    }
  }

  const showVehicleModal = () => {
    setIsVehicleModalVisible(true)
  }

  const hideVehicleModal = () => {
    setIsVehicleModalVisible(false)
  }

  return {
    isDeleteModalVisible,
    selectedVehicleId,
    showDeleteConfirmation,
    cancelDeleteVehicle,
    confirmDeleteVehicle,

    isVehicleModalVisible,
    showVehicleModal,
    hideVehicleModal,
  }
}
