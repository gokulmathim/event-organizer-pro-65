const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

/**
 * User Controller: 
 * - Registration
 * - Login
 * - Profile fetch
 */
class UserController {
  // PUBLIC_INTERFACE
  async register(req, res) {
    /** Registers a new user. */
    try {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const user = await userModel.createUser({ email, password, name });
      return res.status(201).json({ user });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
  // PUBLIC_INTERFACE
  async login(req, res) {
    /** Authenticates user and returns JWT. */
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
      }
      const user = await userModel.verifyUser(email, password);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      return res.json({ token, user });
    } catch (e) {
      return res.status(500).json({ message: 'Authentication failed' });
    }
  }
  // PUBLIC_INTERFACE
  getMe(req, res) {
    /** Gets profile of authenticated user. */
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    return res.json({ user: req.user });
  }
}

module.exports = new UserController();
