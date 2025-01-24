import * as SQLite from 'expo-sqlite';

// Initialize SQLite database connection
const db = SQLite.openDatabaseAsync('userdb.db');

// Create users table if it doesn't exist
export const initDatabase = async () => {
  try {
    const _db = await db;
    // Drop existing table
    await _db.execAsync('DROP TABLE IF EXISTS users');
    
    // Create table with all columns including avatarPath
    await _db.execAsync(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, username TEXT UNIQUE, password TEXT, email TEXT UNIQUE, avatarPath TEXT)'
    );
    console.log('Database initialized with avatarPath column');
  } catch (error) {
    console.error('Init database error:', error);
    throw error;
  }
};

// Insert new user into database with validation
export const insertUser = async (firstName, lastName, username, password, email) => {
  try {
    const _db = await db;
    await _db.runAsync(
      'INSERT INTO users (firstName, lastName, username, password, email, avatarPath) VALUES (?, ?, ?, ?, ?, ?)',
      [firstName, lastName, username, password, email, 'man']
    );
    console.log('New user created with default avatar');
  } catch (error) {
    console.error('Insert user error:', error);
    throw error;
  }
};

// Find user by username for login authentication
export const findUserByUsername = async (username) => {
  try {
    const _db = await db;
    const result = await _db.getFirstAsync(
      'SELECT id, firstName, lastName, username, email, password, avatarPath FROM users WHERE username = ?',
      [username]
    );
    
    if (result) {
      console.log('Found user:', {
        username: result.username,
        avatarPath: result.avatarPath || 'man'
      });
    }
    
    return result;
  } catch (error) {
    console.error('Find user error:', error);
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
          password: user.password,
          avatarPath: user.avatarPath
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

// Update user's profile information
export const updateUserProfile = async (username, firstName, lastName) => {
  try {
    const _db = await db;
    // Update firstName and lastName for specified username
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

// Update user's avatar
export const updateUserAvatar = async (username, avatarPath) => {
  try {
    const _db = await db;
    console.log('Updating avatar for user:', username, 'to:', avatarPath);
    
    // First verify the user exists
    const user = await findUserByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }

    // Update the avatar
    await _db.runAsync(
      'UPDATE users SET avatarPath = ? WHERE username = ?',
      [avatarPath, username]
    );
    
    // Verify the update
    const updatedUser = await findUserByUsername(username);
    console.log('Updated user avatar:', updatedUser?.avatarPath);
    
    if (!updatedUser || updatedUser.avatarPath !== avatarPath) {
      throw new Error('Avatar update failed to save');
    }
    
    return updatedUser;
  } catch (error) {
    console.error('Update avatar error:', error);
    throw error;
  }
}; 