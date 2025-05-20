import PlatListStyles from '@/styles/PlatListStyles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { responsive } from '../../utils/responsive'

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (text: string) => void
  onClearSearch: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <View style={PlatListStyles.searchContainer}>
      <View style={PlatListStyles.searchInputContainer}>
        <Ionicons
          name="search"
          size={responsive.iconSize(20)}
          color="#007D4B"
          style={PlatListStyles.searchIcon}
        />
        <TextInput
          style={PlatListStyles.searchInput}
          placeholder="Cari nomor plat atau jenis kendaraan..."
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholderTextColor={'#B0B0B0'}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={onClearSearch}>
            <Ionicons
              name="close-circle"
              size={responsive.iconSize(20)}
              color="#007D4B"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
