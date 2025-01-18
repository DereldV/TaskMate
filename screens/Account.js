import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Switch, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { updateUserProfile } from '../utils/database';

const Account = ({ route, navigation }) => {
  const { firstName: initialFirstName, lastName: initialLastName, email, username } = route.params;
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [isEditing, setIsEditing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Placeholder data for stats
  const stats = {
    started: 15,
    completed: 8
  };

  const handleSaveProfile = async () => {
    try {
      console.log('Updating profile for user:', username);
      await updateUserProfile(username, firstName, lastName);
      setIsEditing(false);
      
      // Update both Account and Homepage displays
      navigation.setParams({ firstName, lastName });
      navigation.navigate('Homepage', {
        firstName,
        lastName,
        username,
        email
      });
      
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Profile update error:', error);
      Alert.alert('Error', 'Failed to update profile');
      setFirstName(initialFirstName);
      setLastName(initialLastName);
    }
  };

  const handleMenuPress = (menuName) => {
    if (selectedMenu === menuName) {
      setSelectedMenu(null); // Close if already open
      if (isEditing) {
        setIsEditing(false); // Reset editing state when closing
        setFirstName(initialFirstName); // Reset values
        setLastName(initialLastName);
      }
    } else {
      setSelectedMenu(menuName); // Open if closed
    }
  };

  const renderProfileContent = () => (
    <View style={styles.menuContent}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        ) : (
          <Text style={styles.value}>{firstName}</Text>
        )}
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        ) : (
          <Text style={styles.value}>{lastName}</Text>
        )}
      </View>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={isEditing ? handleSaveProfile : () => setIsEditing(true)}
      >
        <Text style={styles.actionButtonText}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderNotificationContent = () => (
    <View style={styles.menuContent}>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Mute All Notifications</Text>
        <Switch
          value={isMuted}
          onValueChange={setIsMuted}
          trackColor={{ false: '#767577', true: '#F6C8C8' }}
          thumbColor={isMuted ? '#fff' : '#f4f3f4'}
        />
      </View>
    </View>
  );

  const renderSettingsContent = () => (
    <View style={styles.menuContent}>
      <TouchableOpacity 
        style={[styles.actionButton, styles.restoreButton]}
        onPress={() => {
          // Add restore logic here
          Alert.alert('Restore', 'Settings restored to default');
        }}
      >
        <Text style={styles.actionButtonText}>Restore to Default</Text>
      </TouchableOpacity>
    </View>
  );

  const menuItems = [
    { 
      title: 'Profile', 
      icon: 'person', 
      onPress: () => handleMenuPress('profile'),
      content: renderProfileContent
    },
    { 
      title: 'Notification', 
      icon: 'notifications', 
      onPress: () => handleMenuPress('notification'),
      content: renderNotificationContent
    },
    { 
      title: 'Settings', 
      icon: 'settings', 
      onPress: () => handleMenuPress('settings'),
      content: renderSettingsContent
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#007BFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={require('../assets/profile_picture_placeholder.png')}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.userName}>{firstName} {lastName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{stats.started}</Text>
            <Text style={styles.statLabel}>Started</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  selectedMenu === item.title.toLowerCase() && styles.selectedMenuItem
                ]}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <MaterialIcons name={item.icon} size={24} color="#F6C8C8" />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <MaterialIcons 
                  name={selectedMenu === item.title.toLowerCase() ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                  size={24} 
                  color="#666" 
                />
              </TouchableOpacity>
              {selectedMenu === item.title.toLowerCase() && item.content()}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7E8CC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7E8CC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#F7E8CC',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginHorizontal: 20,
  },
  statBox: {
    backgroundColor: '#F6C8C8',
    borderRadius: 15,
    padding: 20,
    width: '45%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#333',
  },
  menuContainer: {
    backgroundColor: '#FAFAFA',
    margin: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: '#333',
  },
  menuContent: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: '#F6C8C8',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  restoreButton: {
    backgroundColor: '#ff6b6b',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  selectedMenuItem: {
    backgroundColor: '#f8f8f8',
  },
});

export default Account; 