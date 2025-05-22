import { useDimensions } from '@/hooks/useDimensions'
import { useModalManager } from '@/hooks/useModalManager'
import { useVehicleManager } from '@/hooks/useVehicleManager'
import PlatListStyles from '@/styles/PlatListStyles'
import { handleBackPress } from '@/utils/navigation'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, View } from 'react-native'
import Header from '../components/Header'
import { DeleteConfirmationModal } from '../components/platlist/DeleteConfirmationModal'
import { EmptyState } from '../components/platlist/EmptyState'
import { FloatingActionButton } from '../components/platlist/FloatingActionButton'
import { LoadingState } from '../components/platlist/LoadingState'
import { SearchBar } from '../components/platlist/SearchBar'
import VehicleFormModal from '../components/platlist/VehicleFormModal'
import VehicleList from '../components/platlist/VehicleList'

const PlatListScreen: React.FC = () => {
  const { isSmallScreen, isWeb } = useDimensions()
  const navigation = useNavigation()

  const {
    filteredVehicles,
    searchQuery,
    isLoading,
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
    vehicles,
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

  const onAddVehiclePress = () => {
    handleAddVehicle()
    showVehicleModal()
  }

  const onEditVehiclePress = (id: string) => {
    handleEditVehicle(id)
    showVehicleModal()
  }

  const onSaveVehicle = () => {
    handleSaveVehicle()
    hideVehicleModal()
  }

  const onConfirmDeleteVehicle = () => {
    confirmDeleteVehicle(deleteVehicle)
  }

  return (
    <SafeAreaView style={PlatListStyles.safeArea}>
      <StatusBar style="light" />
      <View style={PlatListStyles.headerContainer}>
        <Header
          title="Daftar Kendaraan"
          onBackPress={() => handleBackPress(isWeb)}
        />
      </View>

      <View style={PlatListStyles.container}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onClearSearch={clearSearch}
        />

        {isLoading ? (
          <LoadingState />
        ) : filteredVehicles.length > 0 ? (
          <VehicleList
            vehicles={filteredVehicles}
            onEdit={onEditVehiclePress}
            onDelete={showDeleteConfirmation}
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
          onChangeVehicleType={handleChangeVehicleType}
          onChangePlateNumber={handleChangePlateNumber}
          onSave={onSaveVehicle}
          onCancel={hideVehicleModal}
        />
      </View>
    </SafeAreaView>
  )
}

export default PlatListScreen
