const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/isAuth');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Get Users Error:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role,imgUrl,coverUrl,bio } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      imgUrl,
      coverUrl,
      bio
    });
    res.status(200).json({ message: 'Register successful', user });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ error: 'Register failed' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, 'your_secret_key');
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Set token as a cookie
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  registerUser,
  loginUser
};
