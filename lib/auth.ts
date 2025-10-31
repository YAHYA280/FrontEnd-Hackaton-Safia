export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthToken {
  token: string;
  user: User;
}

const STORAGE_KEY = 'nextrip_auth';

/**
 * Store authentication data in localStorage
 */
export function setAuth(token: string, user: User): void {
  const authData: AuthToken = { token, user };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
}

/**
 * Get authentication data from localStorage
 */
export function getAuth(): AuthToken | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const authData = localStorage.getItem(STORAGE_KEY);
    if (!authData) return null;
    
    return JSON.parse(authData) as AuthToken;
  } catch (error) {
    console.error('Error reading auth from localStorage:', error);
    return null;
  }
}

/**
 * Remove authentication data from localStorage
 */
export function clearAuth(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getAuth() !== null;
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  const auth = getAuth();
  return auth ? auth.user : null;
}

/**
 * Sign up a new user
 */
export function signUp(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    // Check if user already exists
    const existingUsers = getUsersFromStorage();
    const userExists = existingUsers.some(u => u.email === email);
    
    if (userExists) {
      reject(new Error('User with this email already exists'));
      return;
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      createdAt: new Date().toISOString(),
    };

    // Store user
    existingUsers.push({ ...newUser, password: hashPassword(password) });
    setUsersInStorage(existingUsers);

    // Auto-login after signup
    const token = generateToken(newUser.id);
    setAuth(token, newUser);

    resolve(newUser);
  });
}

/**
 * Sign in an existing user
 */
export function signIn(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    const users = getUsersFromStorage();
    const user = users.find(u => u.email === email);

    if (!user) {
      reject(new Error('Invalid email or password'));
      return;
    }

    // In a real app, you'd use proper password hashing/comparison
    // For simplicity, we'll just check if the stored hash matches
    const inputHash = hashPassword(password);
    if (user.password !== inputHash) {
      reject(new Error('Invalid email or password'));
      return;
    }

    // Create user object without password
    const userData: User = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };

    // Generate token and store auth
    const token = generateToken(user.id);
    setAuth(token, userData);

    resolve(userData);
  });
}

/**
 * Sign out current user
 */
export function signOut(): void {
  clearAuth();
}

// Helper functions for user storage

interface StoredUser extends User {
  password: string;
}

const USERS_STORAGE_KEY = 'nextrip_users';

function getUsersFromStorage(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error reading users from localStorage:', error);
    return [];
  }
}

function setUsersInStorage(users: StoredUser[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

// Simple password hashing (for demo purposes - not secure for production)
function hashPassword(password: string): string {
  // Simple hash for demo - in production use bcrypt or similar
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

// Generate a simple token (for demo purposes)
function generateToken(userId: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${userId}_${timestamp}_${random}`;
}

