// hooks/useVehicleManager.ts
import { useMemo, useState } from 'react'

export const useVehicleManager = () => {
  const [vehicles, setVehicles] = useState<
    Array<{ plate: string; description: string }>
  >([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPlateNumber, setCurrentPlateNumber] = useState('')
  const [currentVehicleType, setCurrentVehicleType] = useState('')
  const [plateNumberError, setPlateNumberError] = useState('')
  const [vehicleTypeError, setVehicleTypeError] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingPlate, setEditingPlate] = useState('')

  // Filter vehicles based on search query
  const filteredVehicles = useMemo(() => {
    if (!searchQuery.trim()) {
      return vehicles
    }

    return vehicles.filter(
      (vehicle) =>
        vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [vehicles, searchQuery])

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  const validatePlateNumber = (plate: string): string => {
    if (!plate.trim()) {
      return 'Nomor plat harus diisi'
    }
    if (plate.length < 3) {
      return 'Nomor plat terlalu pendek'
    }
    return ''
  }

  const validateVehicleType = (type: string): string => {
    if (!type.trim()) {
      return 'Deskripsi kendaraan harus diisi'
    }
    return ''
  }

  const handleChangePlateNumber = (text: string) => {
    setCurrentPlateNumber(text)
    const error = validatePlateNumber(text)
    setPlateNumberError(error)
  }

  const handleChangeVehicleType = (text: string) => {
    setCurrentVehicleType(text)
    const error = validateVehicleType(text)
    setVehicleTypeError(error)
  }

  const handleAddVehicle = () => {
    setIsEditMode(false)
    setEditingPlate('')
    setCurrentPlateNumber('')
    setCurrentVehicleType('')
    setPlateNumberError('')
    setVehicleTypeError('')
  }

  const handleEditVehicle = (plate: string, currentDescription?: string) => {
    setIsEditMode(true)
    setEditingPlate(plate)
    setCurrentPlateNumber(plate)
    setCurrentVehicleType(currentDescription || '')
    setPlateNumberError('')
    setVehicleTypeError('')
  }

  const handleSaveVehicle = () => {
    // Clear form after successful save
    setCurrentPlateNumber('')
    setCurrentVehicleType('')
    setPlateNumberError('')
    setVehicleTypeError('')
    setIsEditMode(false)
    setEditingPlate('')
  }

  const deleteVehicle = (plate: string) => {
    setVehicles((prev) => prev.filter((vehicle) => vehicle.plate !== plate))
  }

  const addVehicle = (vehicle: { plate: string; description: string }) => {
    setVehicles((prev) => [...prev, vehicle])
  }

  const updateVehicle = (plate: string, newDescription: string) => {
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.plate === plate
          ? { ...vehicle, description: newDescription }
          : vehicle
      )
    )
  }

  return {
    vehicles,
    setVehicles,
    filteredVehicles,
    searchQuery,
    handleSearchChange,
    clearSearch,
    currentPlateNumber,
    currentVehicleType,
    plateNumberError,
    vehicleTypeError,
    isEditMode,
    editingPlate,
    handleChangePlateNumber,
    handleChangeVehicleType,
    handleAddVehicle,
    handleEditVehicle,
    handleSaveVehicle,
    deleteVehicle,
    addVehicle,
    updateVehicle,
  }
}
