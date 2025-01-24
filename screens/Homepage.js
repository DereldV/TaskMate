import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

// Main homepage component after user authentication
const Homepage = ({ route, navigation }) => {
  // State for dropdown menu visibility
  const [menuVisible, setMenuVisible] = useState(false);
  // Extract user data from navigation params
  const { firstName, lastName, username, email, avatarPath } = route.params;

  // Define menu items and their actions
  const menuItems = [
    { title: 'Task', icon: 'assignment', onPress: () => navigation.navigate('Task') },
    { title: 'Pomodoro Timer', icon: 'timer', onPress: () => navigation.navigate('PomodoroTimer') },
    { title: 'Progress', icon: 'trending-up', onPress: () => navigation.navigate('Progress') },
    // Navigate to Account with user data
    { title: 'Account', icon: 'person', onPress: () => navigation.navigate('Account', {
      firstName,
      lastName,
      email,
      username,
      avatarPath
    }) },
    // Logout: Reset navigation stack to Auth screen
    { title: 'Log Out', icon: 'logout', onPress: () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with menu button */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => setMenuVisible(true)}
            style={styles.menuButton}
          >
            <MaterialIcons name="menu" size={24} color="#007BFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dashboard</Text>
        </View>

        {/* Welcome message */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>{firstName} {lastName}</Text>
        </View>

        {/* Dropdown Menu Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={menuVisible}
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          >
            <View style={styles.menuContainer}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    item.onPress();
                  }}
                >
                  <MaterialIcons name={item.icon} size={24} color="#F6C8C8" />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Homepage content can be added here */}
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
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  welcomeContainer: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    width: '70%',
    maxWidth: 300,
    height: '100%',
    paddingTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F6C8C8',
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
});

export default Homepage; 