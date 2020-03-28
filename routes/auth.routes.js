const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'incorrect email').isEmail(),
    check('password', 'password min length is 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Validation errors during registration',
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'This email is already used' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'User has been created successfully' });
    } catch {
      res.status(500).json({ message: 'Something went wrong. Please, try again later' });
    }
  },
);

// /api/auth/login
router.post(
  '/login',
  [check('email', 'incorrect email').isEmail(), check('password', 'please, enter password').exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Validation errors during login',
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: `User wasn't found` });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token, userId: user.id });
    } catch {
      res.status(500).json({ message: 'Something went wrong. Please, try again later' });
    }
  },
);

module.exports = router;
