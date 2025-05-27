import {
  addVehicle,
  fetchUserData,
  removeVehicle,
  updateVehicleDescription, // Add this import
} from '@/api/smartParkService'
import { useDimensions } from '@/hooks/useDimensions'
import { useModalManager } from '@/hooks/useModalManager'
import { useVehicleManager } from '@/hooks/useVehicleManager'
import PlatListStyles from '@/styles/PlatListStyles'
import { useNavigation } from '@react-navigation/native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, SafeAreaView, View } from 'react-native'
import Header from '../components/Header'
import { DeleteConfirmationModal } from '../components/platlist/DeleteConfirmationModal'
import { EmptyState } from '../components/platlist/EmptyState'
import { FloatingActionButton } from '../components/platlist/FloatingActionButton'
import { LoadingState } from '../components/platlist/LoadingState'
import VehicleFormModal from '../components/platlist/VehicleFormModal'
import VehicleList from '../components/platlist/VehicleList'

const PlatListScreen: React.FC = () => {
  const { isSmallScreen, isWeb } = useDimensions()
  const navigation = useNavigation()

  // State untuk menyimpan vehicles dari backend
  const [vehicles, setVehicles] = useState<
    Array<{ plate: string; description: string }>
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Add state to store original plate number for editing
  const [originalPlateNumber, setOriginalPlateNumber] = useState('')

  const {
    filteredVehicles,
    searchQuery,
    handleSearchChange,
    clearSearch,
    handleAddVehicle,
    handleEditVehicle,
    handleSaveVehicle,
    deleteVehicle,
    currentPlateNumber,
    currentVehicleType,
    plateNumberError,
    vehicleTypeError,
    handleChangePlateNumber,
    handleChangeVehicleType,
    isEditMode,
  } = useVehicleManager()

  const {
    isDeleteModalVisible,
    selectedVehicleId,
    showDeleteConfirmation,
    cancelDeleteVehicle,
    confirmDeleteVehicle,
    isVehicleModalVisible,
    hideVehicleModal,
    showVehicleModal,
  } = useModalManager()

  // Fungsi untuk memuat data kendaraan dari backend
  const loadVehicles = useCallback(async () => {
    try {
      setIsLoading(true)
      const userData = await fetchUserData()
      setVehicles(userData.vehicles || [])
    } catch (error) {
      console.error('Error loading vehicles:', error)
      Alert.alert('Error', 'Gagal memuat data kendaraan. Silakan coba lagi.', [
        { text: 'OK' },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fungsi untuk refresh data
  const refreshVehicles = useCallback(async () => {
    try {
      setIsRefreshing(true)
      const userData = await fetchUserData()
      setVehicles(userData.vehicles || [])
    } catch (error) {
      console.error('Error refreshing vehicles:', error)
      Alert.alert('Error', 'Gagal memperbarui data kendaraan.', [
        { text: 'OK' },
      ])
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  // Load vehicles saat component mount
  useEffect(() => {
    loadVehicles()
  }, [loadVehicles])

  // Fungsi untuk menambah kendaraan ke backend
  const handleAddVehicleToBackend = async (
    plate: string,
    description: string
  ) => {
    try {
      setIsSaving(true)
      const response = await addVehicle(plate, description)

      if (response.success && response.data) {
        setVehicles(response.data.vehicles || [])
        Alert.alert('Berhasil', 'Kendaraan berhasil ditambahkan!', [
          { text: 'OK' },
        ])
        return true
      } else {
        Alert.alert('Error', response.error || 'Gagal menambahkan kendaraan', [
          { text: 'OK' },
        ])
        return false
      }
    } catch (error) {
      console.error('Error adding vehicle:', error)
      Alert.alert('Error', 'Terjadi kesalahan saat menambahkan kendaraan', [
        { text: 'OK' },
      ])
      return false
    } finally {
      setIsSaving(false)
    }
  }

  // Fungsi untuk mengupdate kendaraan di backend
  const handleUpdateVehicleToBackend = async (
    originalPlate: string,
    newPlate: string,
    newDescription: string
  ) => {
    try {
      setIsSaving(true)

      // If plate number changed, we need to remove old and add new
      if (originalPlate !== newPlate) {
        // First remove the old vehicle
        const removeResponse = await removeVehicle(originalPlate)
        if (!removeResponse.success) {
          Alert.alert(
            'Error',
            removeResponse.error || 'Gagal menghapus kendaraan lama',
            [{ text: 'OK' }]
          )
          return false
        }

        // Then add the new vehicle
        const addResponse = await addVehicle(newPlate, newDescription)
        if (addResponse.success && addResponse.data) {
          setVehicles(addResponse.data.vehicles || [])
          Alert.alert('Berhasil', 'Kendaraan berhasil diperbarui!', [
            { text: 'OK' },
          ])
          return true
        } else {
          Alert.alert(
            'Error',
            addResponse.error || 'Gagal menambahkan kendaraan baru',
            [{ text: 'OK' }]
          )
          return false
        }
      } else {
        // Only description changed, use update API
        const response = await updateVehicleDescription(
          newPlate,
          newDescription
        )

        if (response.success && response.data) {
          setVehicles(response.data.vehicles || [])
          Alert.alert('Berhasil', 'Kendaraan berhasil diperbarui!', [
            { text: 'OK' },
          ])
          return true
        } else {
          Alert.alert(
            'Error',
            response.error || 'Gagal memperbarui kendaraan',
            [{ text: 'OK' }]
          )
          return false
        }
      }
    } catch (error) {
      console.error('Error updating vehicle:', error)
      Alert.alert('Error', 'Terjadi kesalahan saat memperbarui kendaraan', [
        { text: 'OK' },
      ])
      return false
    } finally {
      setIsSaving(false)
    }
  }

  // Fungsi untuk menghapus kendaraan dari backend
  const handleRemoveVehicleFromBackend = async (plate: string) => {
    try {
      setIsDeleting(true)
      const response = await removeVehicle(plate)

      if (response.success && response.data) {
        setVehicles(response.data.vehicles || [])
        Alert.alert('Berhasil', 'Kendaraan berhasil dihapus!', [{ text: 'OK' }])
        return true
      } else {
        Alert.alert('Error', response.error || 'Gagal menghapus kendaraan', [
          { text: 'OK' },
        ])
        return false
      }
    } catch (error) {
      console.error('Error removing vehicle:', error)
      Alert.alert('Error', 'Terjadi kesalahan saat menghapus kendaraan', [
        { text: 'OK' },
      ])
      return false
    } finally {
      setIsDeleting(false)
    }
  }

  const onAddVehiclePress = () => {
    setOriginalPlateNumber('') // Clear original plate for add mode
    handleAddVehicle()
    showVehicleModal()
  }

  const onEditVehiclePress = (plate: string) => {
    // Find vehicle by plate for editing
    const vehicle = vehicles.find((v) => v.plate === plate)
    if (vehicle) {
      setOriginalPlateNumber(plate) // Store original plate for comparison
      handleEditVehicle(plate)
      showVehicleModal()
    }
  }

  const onSaveVehicle = async () => {
    // Validasi input
    if (!currentPlateNumber.trim()) {
      Alert.alert('Error', 'Nomor plat harus diisi')
      return
    }

    if (isEditMode) {
      // Update existing vehicle
      const success = await handleUpdateVehicleToBackend(
        originalPlateNumber,
        currentPlateNumber.trim(),
        currentVehicleType.trim()
      )

      if (success) {
        handleSaveVehicle()
        hideVehicleModal()
        setOriginalPlateNumber('') // Clear original plate
      }
    } else {
      // Add new vehicle
      const success = await handleAddVehicleToBackend(
        currentPlateNumber.trim(),
        currentVehicleType.trim()
      )

      if (success) {
        handleSaveVehicle()
        hideVehicleModal()
      }
    }
  }

  const onCancelModal = () => {
    setOriginalPlateNumber('') // Clear original plate when canceling
    hideVehicleModal()
  }

  const onConfirmDeleteVehicle = async () => {
    if (selectedVehicleId) {
      const success = await handleRemoveVehicleFromBackend(selectedVehicleId)
      if (success) {
        confirmDeleteVehicle(deleteVehicle)
      }
    }
  }

  // Filter vehicles based on search query
  const getFilteredVehicles = () => {
    if (!searchQuery.trim()) {
      return vehicles
    }

    return vehicles.filter(
      (vehicle) =>
        vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const filteredVehiclesList = getFilteredVehicles()

  return (
    <SafeAreaView style={PlatListStyles.safeArea}>
      <StatusBar style="light" />
      <View style={PlatListStyles.headerContainer}>
        <Header
          title="Daftar Kendaraan"
          onBackPress={() => router.push('/smart-park')}
        />
      </View>

      <View style={PlatListStyles.container}>
        {/* <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onClearSearch={clearSearch}
        /> */}

        {isLoading ? (
          <LoadingState />
        ) : filteredVehiclesList.length > 0 ? (
          <VehicleList
            vehicles={filteredVehiclesList}
            onEdit={onEditVehiclePress}
            onDelete={showDeleteConfirmation}
            onRefresh={refreshVehicles}
            refreshing={isRefreshing}
          />
        ) : (
          <EmptyState />
        )}

        <FloatingActionButton onPress={onAddVehiclePress} />

        {/* Render Modals */}
        <DeleteConfirmationModal
          isVisible={isDeleteModalVisible}
          vehicles={vehicles}
          selectedVehicleId={selectedVehicleId}
          isDeleting={isDeleting}
          onConfirm={onConfirmDeleteVehicle}
          onCancel={cancelDeleteVehicle}
        />
        <VehicleFormModal
          isVisible={isVehicleModalVisible}
          isEditMode={isEditMode}
          currentPlateNumber={currentPlateNumber}
          currentVehicleType={currentVehicleType}
          plateNumberError={plateNumberError}
          vehicleTypeError={vehicleTypeError}
          isSmallScreen={isSmallScreen}
          isSaving={isSaving}
          onChangeVehicleType={handleChangeVehicleType}
          onChangePlateNumber={handleChangePlateNumber}
          onSave={onSaveVehicle}
          onCancel={onCancelModal}
        />
      </View>
    </SafeAreaView>
  )
}

export default PlatListScreen
