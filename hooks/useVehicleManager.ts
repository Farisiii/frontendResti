import { useEffect, useState } from 'react'
import { Vehicle } from '../types/vehicle'

export const useVehicleManager = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [currentPlateNumber, setCurrentPlateNumber] = useState('')
  const [currentVehicleType, setCurrentVehicleType] = useState('')
  const [currentVehicleId, setCurrentVehicleId] = useState<string | null>(null)
  const [plateNumberError, setPlateNumberError] = useState('')
  const [vehicleTypeError, setVehicleTypeError] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const mockData: Vehicle[] = [
          {
            id: '1',
            plateNumber: 'B 1111 AKE',
            vehicleType: 'Supra Bapak',
            ownerName: 'Budi Santoso',
          },
          {
            id: '2',
            plateNumber: 'D 5678 XYZ',
            vehicleType: 'SUV',
            ownerName: 'Ani Wijaya',
          },
          {
            id: '3',
            plateNumber: 'F 9012 DEF',
            vehicleType: 'Hatchback',
            ownerName: 'Citra Purnama',
          },
          {
            id: '4',
            plateNumber: 'B 3456 GHI',
            vehicleType: 'MPV',
            ownerName: 'Denny Pradana',
          },
          {
            id: '5',
            plateNumber: 'A 7890 JKL',
            vehicleType: 'Pickup',
            ownerName: 'Eka Saputra',
          },
          {
            id: '6',
            plateNumber: 'B 1111 AKE',
            vehicleType: 'Supra Bapak',
            ownerName: 'Fina Wulandari',
          },
          {
            id: '7',
            plateNumber: 'D 1357 PQR',
            vehicleType: 'SUV',
            ownerName: 'Galih Nugroho',
          },
          {
            id: '8',
            plateNumber: 'F 8642 STU',
            vehicleType: 'MPV',
            ownerName: 'Hana Permata',
          },
          {
            id: '9',
            plateNumber: 'B 9753 VWX',
            vehicleType: 'Hatchback',
            ownerName: 'Indra Kusuma',
          },
          {
            id: '10',
            plateNumber: 'B 1111 AKE',
            vehicleType: 'Supra Bapak',
            ownerName: 'Joko Widodo',
          },
        ]

        setTimeout(() => {
          setVehicles(mockData)
          setFilteredVehicles(mockData)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching vehicles:', error)
        setIsLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredVehicles(vehicles)
    } else {
      const lowercaseQuery = searchQuery.toLowerCase()
      const filtered = vehicles.filter(
        (vehicle) =>
          vehicle.plateNumber.toLowerCase().includes(lowercaseQuery) ||
          vehicle.vehicleType.toLowerCase().includes(lowercaseQuery)
      )
      setFilteredVehicles(filtered)
    }
  }, [searchQuery, vehicles])

  const resetForm = () => {
    setCurrentPlateNumber('')
    setCurrentVehicleType('')
    setCurrentVehicleId(null)
    setPlateNumberError('')
    setVehicleTypeError('')
  }

  const handleAddVehicle = () => {
    resetForm()
    setIsEditMode(false)
  }

  const handleEditVehicle = (vehicleId: string) => {
    const selectedVehicle = vehicles.find((v) => v.id === vehicleId)

    if (selectedVehicle) {
      setCurrentPlateNumber(selectedVehicle.plateNumber)
      setCurrentVehicleType(selectedVehicle.vehicleType)
      setCurrentVehicleId(vehicleId)
      setPlateNumberError('')
      setVehicleTypeError('')
      setIsEditMode(true)
    }
  }

  const validateForm = (): boolean => {
    let isValid = true

    if (!currentPlateNumber.trim()) {
      setPlateNumberError('Nomor plat tidak boleh kosong')
      isValid = false
    } else {
      setPlateNumberError('')
    }

    if (!currentVehicleType.trim()) {
      setVehicleTypeError('Jenis kendaraan tidak boleh kosong')
      isValid = false
    } else {
      setVehicleTypeError('')
    }

    return isValid
  }

  const handleSaveVehicle = () => {
    if (!validateForm()) return

    if (isEditMode && currentVehicleId) {
      const updatedVehicles = vehicles.map((vehicle) =>
        vehicle.id === currentVehicleId
          ? {
              ...vehicle,
              plateNumber: currentPlateNumber,
              vehicleType: currentVehicleType,
            }
          : vehicle
      )
      setVehicles(updatedVehicles)
      console.log(
        'Updated Vehicle',
        currentVehicleId,
        currentPlateNumber,
        currentVehicleType
      )
    } else {
      const newVehicle: Vehicle = {
        id: (vehicles.length + 1).toString(),
        plateNumber: currentPlateNumber,
        vehicleType: currentVehicleType,
        ownerName: 'Pemilik Baru',
      }
      setVehicles([...vehicles, newVehicle])
      console.log('Added New Vehicle', newVehicle)
    }
  }

  const deleteVehicle = (vehicleId: string) => {
    const updatedVehicles = vehicles.filter(
      (vehicle) => vehicle.id !== vehicleId
    )
    setVehicles(updatedVehicles)
    console.log('Deleted Vehicle', vehicleId)
  }

  const handleSearchChange = (text: string) => {
    setSearchQuery(text)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  const handleChangePlateNumber = (text: string) => {
    setCurrentPlateNumber(text)
    if (text.trim()) setPlateNumberError('')
  }

  const handleChangeVehicleType = (text: string) => {
    setCurrentVehicleType(text)
    if (text.trim()) setVehicleTypeError('')
  }

  return {
    vehicles,
    filteredVehicles,
    searchQuery,
    isLoading,
    currentPlateNumber,
    currentVehicleType,
    plateNumberError,
    vehicleTypeError,
    isEditMode,

    handleSearchChange,
    clearSearch,
    handleAddVehicle,
    handleEditVehicle,
    handleSaveVehicle,
    deleteVehicle,
    handleChangePlateNumber,
    handleChangeVehicleType,
    resetForm,
  }
}
