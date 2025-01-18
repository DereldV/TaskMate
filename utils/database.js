import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('userdb.db');

export const initDatabase = async () => {
  try {
    const _db = await db;
    await _db.execAsync(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, username TEXT UNIQUE, password TEXT, email TEXT UNIQUE)'
    );
  } catch (error) {
    console.error('Init database error:', error);
    throw error;
  }
};

export const insertUser = async (firstName, lastName, username, password, email) => {
  try {
    const _db = await db;
    await _db.runAsync(
      'INSERT INTO users (firstName, lastName, username, password, email) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, username, password, email]
    );
  } catch (error) {
    console.error('Insert user error:', error);
    throw error;
  }
};

export const findUserByUsername = async (username) => {
  try {
    console.log('Searching for username:', username);
    
    const _db = await db;
    const result = await _db.getFirstAsync(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (result) {
      console.log('Found user:', {
        username: result.username,
        password: result.password,
        firstName: result.firstName,
        lastName: result.lastName
      });
    } else {
      console.error('No user found with username:', username);
    }
    
    return result;
  } catch (error) {
    console.error('Find user error:', error);
    console.error('Failed to find user with username:', username);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const _db = await db;
    const result = await _db.getAllAsync('SELECT * FROM users');
    
    console.log('All users in database:', result);
    if (result && result.length > 0) {
      result.forEach(user => {
        console.log('User:', {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password
        });
      });
    } else {
      console.log('No users found in database');
    }
    
    return result;
  } catch (error) {
    console.error('Get all users error:', error);
    throw error;
  }
};

export const updateUserProfile = async (username, firstName, lastName) => {
  try {
    const _db = await db;
    await _db.runAsync(
      'UPDATE users SET firstName = ?, lastName = ? WHERE username = ?',
      [firstName, lastName, username]
    );
    console.log('Profile updated successfully for user:', username);
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
}; 