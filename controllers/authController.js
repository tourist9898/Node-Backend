const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');


dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;


const authController = {

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

   
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

 
  logout: async (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully' });
  }
};

module.exports = authController;
