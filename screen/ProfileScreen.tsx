import { LoadingState } from '@/components/platlist/LoadingState'
import profileStyles from '@/styles/profileStyles'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  clearUserData,
  fetchUserData,
  getCurrentUser,
  logoutUser,
  updateProfile,
} from '../api/smartParkService'
import Header from '../components/Header'
import { BackendUser, UserData } from '../types/smartPark'

interface ProfileData {
  user: BackendUser
  wallet: {
    walletID: string
    userID: string
    current_balance: number
    created_at: string
    updated_at: string
  }
}

interface EditModalState {
  visible: boolean
  type: 'username' | 'email' | 'password' | null
  value: string
  confirmPassword?: string
}

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [editModal, setEditModal] = useState<EditModalState>({
    visible: false,
    type: null,
    value: '',
    confirmPassword: '',
  })
  const [saving, setSaving] = useState(false)

  // Fetch profile data using smartParkService
  const fetchProfile = async () => {
    try {
      setLoading(true)

      // Get user data from service
      const userData: UserData = await fetchUserData()

      // Get current user from storage for additional info
      const currentUser = await getCurrentUser()

      if (userData && currentUser) {
        // Transform data to match expected format
        const transformedData: ProfileData = {
          user: {
            userID: userData.userID || '',
            username: userData.name || userData.name || '',
            email: userData.email || '',
            vehicles: userData.vehicles || [],
            role: userData.role || 'user',
            rfid: userData.rfid || '',
          },
          wallet: {
            walletID: `wallet_${userData.userID || 'unknown'}`,
            userID: userData.userID || '',
            current_balance: userData.balance || 0,
            created_at: userData.created_at || new Date().toISOString(),
            updated_at: userData.updated_at || new Date().toISOString(),
          },
        }

        setProfileData(transformedData)
      } else {
        Alert.alert('Error', 'Unable to fetch profile data')
      }
    } catch (error: any) {
      console.error('Profile fetch error:', error)
      Alert.alert(
        'Error',
        error.message || 'Failed to fetch profile data. Please try again.'
      )
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    fetchProfile()
  }

  const handleBackPress = () => {
    router.push('/smart-park')
  }

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logoutUser()
            await clearUserData()
            router.replace('/login')
          } catch (error) {
            console.error('Logout error:', error)
            Alert.alert('Error', 'Failed to logout. Please try again.')
          }
        },
      },
    ])
  }

  const openEditModal = (type: 'username' | 'email' | 'password') => {
    const currentValue =
      type === 'username'
        ? profileData?.user.username || ''
        : type === 'email'
        ? profileData?.user.email || ''
        : ''

    setEditModal({
      visible: true,
      type,
      value: currentValue,
      confirmPassword: '',
    })
  }

  const closeEditModal = () => {
    setEditModal({
      visible: false,
      type: null,
      value: '',
      confirmPassword: '',
    })
  }

  const validateInput = (): boolean => {
    const { type, value, confirmPassword } = editModal

    if (!value.trim()) {
      Alert.alert('Error', 'Field cannot be empty')
      return false
    }

    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        Alert.alert('Error', 'Please enter a valid email address')
        return false
      }
    }

    if (type === 'password') {
      if (value.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long')
        return false
      }
      if (value !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match')
        return false
      }
    }

    if (type === 'username' && value.length < 3) {
      Alert.alert('Error', 'Username must be at least 3 characters long')
      return false
    }

    return true
  }

  const handleSaveEdit = async () => {
    if (!validateInput()) return

    setSaving(true)
    try {
      const updateData: any = {}

      if (editModal.type === 'username') {
        updateData.username = editModal.value
      } else if (editModal.type === 'email') {
        updateData.email = editModal.value
      } else if (editModal.type === 'password') {
        updateData.password = editModal.value
      }

      const result = await updateProfile(updateData)

      if (result.success) {
        // Close modal immediately and refresh data
        closeEditModal()
        fetchProfile() // Refresh profile data
      } else {
        Alert.alert('Error', result.error || 'Failed to update profile')
      }
    } catch (error: any) {
      console.error('Update profile error:', error)
      Alert.alert('Error', error.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getModalTitle = () => {
    switch (editModal.type) {
      case 'username':
        return 'Edit Username'
      case 'email':
        return 'Edit Email'
      case 'password':
        return 'Change Password'
      default:
        return 'Edit'
    }
  }

  const getPlaceholder = () => {
    switch (editModal.type) {
      case 'username':
        return 'Enter new username'
      case 'email':
        return 'Enter new email'
      case 'password':
        return 'Enter new password'
      default:
        return 'Enter value'
    }
  }

  // Loading state
  if (loading) {
    return <LoadingState />
  }

  // Error state - if no profile data
  if (!profileData) {
    return (
      <View style={profileStyles.container}>
        <Header
          title="Profile"
          onBackPress={handleBackPress}
          showBackButton={true}
          showLogoutButton={true}
          onLogout={() => {
            router.push('/login')
          }}
        />
        <View style={profileStyles.errorContainer}>
          <View style={profileStyles.errorIconContainer}>
            <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
          </View>
          <Text style={profileStyles.errorText}>
            Failed to load profile data
          </Text>
          <Text style={profileStyles.errorSubText}>Pull down to refresh</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={profileStyles.container}>
      <Header
        title="Profile"
        onBackPress={handleBackPress}
        showBackButton={true}
        onLogout={handleLogout}
        showLogoutButton={true}
      />

      <ScrollView
        style={profileStyles.scrollView}
        contentContainerStyle={profileStyles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007D4B']}
            tintColor="#007D4B"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={profileStyles.content}>
          {/* Profile Header */}
          <View style={profileStyles.profileHeader}>
            <View style={profileStyles.avatarContainer}>
              <View style={profileStyles.avatar}>
                <Ionicons name="person" size={40} color="#007D4B" />
              </View>
            </View>
            <Text style={profileStyles.username}>
              {profileData.user.username}
            </Text>
            <View style={profileStyles.roleContainer}>
              <Text style={profileStyles.role}>
                {profileData.user.role.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* User Info Card */}
          <View style={profileStyles.card}>
            <View style={profileStyles.cardHeader}>
              <View style={profileStyles.cardHeaderLeft}>
                <View style={profileStyles.iconContainer}>
                  <Ionicons name="person-outline" size={20} color="#007D4B" />
                </View>
                <Text style={profileStyles.cardTitle}>User Information</Text>
              </View>
            </View>

            <View style={profileStyles.cardContent}>
              {/* Username Row */}
              <View style={profileStyles.editableRow}>
                <View style={profileStyles.infoSection}>
                  <View style={profileStyles.infoLabelContainer}>
                    <Ionicons name="at-outline" size={16} color="#666" />
                    <Text style={profileStyles.infoLabel}>Username</Text>
                  </View>
                  <Text style={profileStyles.infoValue}>
                    {profileData.user.username}
                  </Text>
                </View>
                <TouchableOpacity
                  style={profileStyles.editButton}
                  onPress={() => openEditModal('username')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="pencil" size={16} color="#007D4B" />
                </TouchableOpacity>
              </View>

              {/* Email Row */}
              <View style={profileStyles.editableRow}>
                <View style={profileStyles.infoSection}>
                  <View style={profileStyles.infoLabelContainer}>
                    <Ionicons name="mail-outline" size={16} color="#666" />
                    <Text style={profileStyles.infoLabel}>Email</Text>
                  </View>
                  <Text style={profileStyles.infoValue}>
                    {profileData.user.email}
                  </Text>
                </View>
                <TouchableOpacity
                  style={profileStyles.editButton}
                  onPress={() => openEditModal('email')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="pencil" size={16} color="#007D4B" />
                </TouchableOpacity>
              </View>

              {/* Password Row */}
              <View style={profileStyles.editableRow}>
                <View style={profileStyles.infoSection}>
                  <View style={profileStyles.infoLabelContainer}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={16}
                      color="#666"
                    />
                    <Text style={profileStyles.infoLabel}>Password</Text>
                  </View>
                  <Text style={profileStyles.infoValue}>••••••••</Text>
                </View>
                <TouchableOpacity
                  style={profileStyles.editButton}
                  onPress={() => openEditModal('password')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="pencil" size={16} color="#007D4B" />
                </TouchableOpacity>
              </View>

              {/* RFID Row (non-editable) */}
              <View style={profileStyles.infoRow}>
                <View style={profileStyles.infoLabelContainer}>
                  <Ionicons name="card-outline" size={16} color="#666" />
                  <Text style={profileStyles.infoLabel}>RFID</Text>
                </View>
                <Text style={profileStyles.infoValue}>
                  {profileData.user.rfid || 'Not assigned'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={editModal.visible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeEditModal}
        statusBarTranslucent={true}
      >
        <View style={profileStyles.modalOverlay}>
          <View style={profileStyles.modalContainer}>
            <View style={profileStyles.modalHeader}>
              <Text style={profileStyles.modalTitle}>{getModalTitle()}</Text>
              <TouchableOpacity
                onPress={closeEditModal}
                style={profileStyles.closeButton}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={profileStyles.modalContent}>
              <View style={profileStyles.inputContainer}>
                <TextInput
                  style={profileStyles.modalInput}
                  value={editModal.value}
                  onChangeText={(text) =>
                    setEditModal((prev) => ({ ...prev, value: text }))
                  }
                  placeholder={getPlaceholder()}
                  placeholderTextColor="#999"
                  secureTextEntry={editModal.type === 'password'}
                  autoCapitalize={editModal.type === 'email' ? 'none' : 'words'}
                  keyboardType={
                    editModal.type === 'email' ? 'email-address' : 'default'
                  }
                />
              </View>

              {editModal.type === 'password' && (
                <View style={[profileStyles.inputContainer, { marginTop: 16 }]}>
                  <TextInput
                    style={profileStyles.modalInput}
                    value={editModal.confirmPassword}
                    onChangeText={(text) =>
                      setEditModal((prev) => ({
                        ...prev,
                        confirmPassword: text,
                      }))
                    }
                    placeholder="Confirm new password"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                  />
                </View>
              )}
            </View>

            <View style={profileStyles.modalActions}>
              <TouchableOpacity
                style={[profileStyles.modalButton, profileStyles.cancelButton]}
                onPress={closeEditModal}
                activeOpacity={0.8}
              >
                <Text style={profileStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  profileStyles.modalButton,
                  profileStyles.saveButton,
                  saving && profileStyles.saveButtonDisabled,
                ]}
                onPress={handleSaveEdit}
                disabled={saving}
                activeOpacity={0.8}
              >
                <Text style={profileStyles.saveButtonText}>
                  {saving ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ProfileScreen
