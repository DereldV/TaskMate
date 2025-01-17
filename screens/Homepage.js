import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const Homepage = ({ route, navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { firstName, lastName } = route.params;

  const menuItems = [
    { title: 'Task', icon: 'assignment', onPress: () => navigation.navigate('Task') },
    { title: 'Pomodoro Timer', icon: 'timer', onPress: () => navigation.navigate('PomodoroTimer') },
    { title: 'Progress', icon: 'trending-up', onPress: () => navigation.navigate('Progress') },
    { title: 'Account', icon: 'person', onPress: () => navigation.navigate('Account', {
      firstName,
      lastName,
      email: 'user@example.com'
    }) },
    { title: 'Log Out', icon: 'logout', onPress: () => navigation.navigate('Login') },
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
          <Text style={styles.headerTitle}>Home</Text>
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
          <SafeAreaView style={styles.modalOverlay}>
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
                    <MaterialIcons name={item.icon} size={24} color="#007BFF" />
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </SafeAreaView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#F6C8C8',
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
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
});

export default Homepage; 