const bcrypt = require('bcrypt');

/**
 * In-memory User model (for demonstration only).
 * Replace with DB/ORM (e.g., mongoose, sequelize) for production.
 */
class UserModel {
  constructor() {
    // user sample: { id, email, passwordHash, name, createdAt }
    this.users = [];
    this.lastId = 0;
  }
  // PUBLIC_INTERFACE
  async createUser({ email, password, name }) {
    /** Creates a new user after hashing password. */
    const existing = this.users.find((u) => u.email === email);
    if (existing) throw new Error('Email already exists');
    const passwordHash = await bcrypt.hash(password, 10);
    const id = (++this.lastId).toString();
    const newUser = { id, email, passwordHash, name, createdAt: new Date().toISOString() };
    this.users.push(newUser);
    return { ...newUser, passwordHash: undefined };
  }
  // PUBLIC_INTERFACE
  async verifyUser(email, password) {
    /** Returns user if email/password matches, null otherwise. */
    const user = this.users.find((u) => u.email === email);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    return ok ? { ...user, passwordHash: undefined } : null;
  }
  // PUBLIC_INTERFACE
  getUserById(id) {
    /** Gets user by id. */
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;
    return { ...user, passwordHash: undefined };
  }
  // PUBLIC_INTERFACE
  getUserByEmail(email) {
    /** Gets user by email. */
    const user = this.users.find((u) => u.email === email);
    if (!user) return null;
    return { ...user, passwordHash: undefined };
  }
}

module.exports = new UserModel();
