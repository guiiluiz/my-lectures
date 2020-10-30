const express = require('express');
const rescue = require('../rescue');
const User = require('../models/user');
const generateJWT = require('../service/generateJWT');
const verifyJWT = require('../middlewares/verifyJWT');

const router = express.Router();

const createUser = async (req, res) => {
  const { name, email, password, manager } = req.body;
  const user = new User(name, email, password, manager);

  return await user.create().then(() => {
    const token = generateJWT(email, manager);
    res.status(201).json({ name, token, email, manager });
  });
};

const getUser = async (req, res) => {
  const { email } = req.user;
  return res.status(200).json({ email });
};

router.post('/', rescue(createUser));

router.get('/', verifyJWT, rescue(getUser));

module.exports = router;
