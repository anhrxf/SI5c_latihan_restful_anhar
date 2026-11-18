const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { errorHttp } = require('../middlewares/errorHandler');

const SALT_ROUNDS = 10;
const PASSWORD_MIN = 8;
const PASSWORD_MAKS_BYTE = 72; // batas bcrypt: karakter setelah byte ke-72 diabaikan

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (typeof password !== 'string' || password.length < PASSWORD_MIN) {
    throw errorHttp(400, `password wajib diisi, minimal ${PASSWORD_MIN} karakter`);
  }
  if (Buffer.byteLength(password) > PASSWORD_MAKS_BYTE) {
    throw errorHttp(400, `password maksimal ${PASSWORD_MAKS_BYTE} byte`);
  }

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ username, password: hashed });
  res.status(201).json({ id: user._id, username: user.username });
};